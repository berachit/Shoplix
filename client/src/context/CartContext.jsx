import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addToCartApi,
  getCart,
  listProducts,
  removeFromCartApi,
  updateCartApi,
} from "../utils/api";
import { useAuth } from "./AuthContext";

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("shoplix:cart");
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("shoplix:wish");
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    localStorage.setItem("shoplix:cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("shoplix:wish", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadServerCart = async () => {
      try {
        const [{ data: cart }, { data: productsRes }] = await Promise.all([
          getCart(),
          listProducts({ limit: 1000 }),
        ]);

        if (!cart.success || !productsRes.success) return;

        const productMap = new Map(productsRes.products.map((product) => [product._id, product]));
        const entries = Object.entries(cart.cartData ?? {});

        setItems(
          entries
            .map(([productId, qty]) => {
              const product = productMap.get(productId);
              if (!product) return null;
              const size = product.sizes?.[0] ?? "One Size";
              const color = product.colors?.[0] ?? "";
              return {
                id: `${product._id}-${size}-${color}`,
                product,
                size,
                color,
                qty: Number(qty) || 1,
              };
            })
            .filter(Boolean),
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadServerCart();
  }, [isAuthenticated]);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return {
      items, wishlist, subtotal, count,
      add: (product, opts) => {
        const size = opts?.size ?? product.sizes?.[0] ?? "One Size";
        const color = opts?.color ?? product.colors?.[0] ?? "";
        const qty = opts?.qty ?? 1;
        const productId = product._id ?? product.id;
        const key = `${productId}-${size}-${color}`;
        const existing = items.find((i) => i.id === key);
        const nextQty = (existing?.qty ?? 0) + qty;
        setItems((prev) => {
          const ex = prev.find((i) => i.id === key);
          if (ex) return prev.map((i) => (i.id === key ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { id: key, product, size, color, qty }];
        });
        if (isAuthenticated && productId) {
          addToCartApi(productId)
            .then(() => (nextQty > 1 ? updateCartApi(productId, nextQty) : null))
            .catch(console.error);
        }
      },
      remove: (id) => {
        const item = items.find((i) => i.id === id);
        setItems((prev) => prev.filter((i) => i.id !== id));
        const productId = item?.product?._id ?? item?.product?.id;
        if (isAuthenticated && productId) removeFromCartApi(productId).catch(console.error);
      },
      setQty: (id, qty) => {
        const nextQty = Math.max(1, qty);
        const item = items.find((i) => i.id === id);
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, qty: nextQty } : i)),
        );
        const productId = item?.product?._id ?? item?.product?.id;
        if (isAuthenticated && productId) updateCartApi(productId, nextQty).catch(console.error);
      },
      clear: () => {
        if (isAuthenticated) {
          items.forEach((item) => {
            const productId = item.product?._id ?? item.product?.id;
            if (productId) removeFromCartApi(productId).catch(console.error);
          });
        }
        setItems([]);
      },
      toggleWish: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    };
  }, [isAuthenticated, items, wishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
};
