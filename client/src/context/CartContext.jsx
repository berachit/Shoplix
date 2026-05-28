import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("shoplix:cart");
      const wl = localStorage.getItem("shoplix:wish");
      if (raw) setItems(JSON.parse(raw));
      if (wl) setWishlist(JSON.parse(wl));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("shoplix:cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("shoplix:wish", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return {
      items, wishlist, subtotal, count,
      add: (product, opts) => {
        const size = opts?.size ?? product.sizes[0];
        const color = opts?.color ?? product.colors[0];
        const qty = opts?.qty ?? 1;
        const key = `${product.id}-${size}-${color}`;
        setItems((prev) => {
          const ex = prev.find((i) => i.id === key);
          if (ex) return prev.map((i) => (i.id === key ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { id: key, product, size, color, qty }];
        });
      },
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
        ),
      clear: () => setItems([]),
      toggleWish: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    };
  }, [items, wishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
};
