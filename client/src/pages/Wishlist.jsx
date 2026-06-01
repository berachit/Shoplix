import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { listProducts } from "../utils/api";
import { formatPrice } from "../utils/format";

export default function Wishlist() {
  const { wishlist, toggleWish, add } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data } = await listProducts({ limit: 1000 });
        if (data.success) setProducts(data.products);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [wishlist.length]);

  const wishedProducts = useMemo(() => {
    const wished = new Set(wishlist);
    return products.filter((product) => wished.has(product._id));
  }, [products, wishlist]);

  if (loading) {
    return (
      <div className="container-px mx-auto max-w-7xl pt-10 md:pt-16">
        <h1 className="font-display text-5xl md:text-6xl">Wishlist</h1>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] rounded-2xl bg-muted" />
              <div className="mt-4 h-3 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wishedProducts.length === 0) {
    return (
      <div className="container-px mx-auto max-w-2xl py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto size-20 rounded-full bg-muted flex items-center justify-center">
            <Heart className="size-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-5xl mt-8">Your wishlist is empty.</h1>
          <p className="mt-4 text-muted-foreground">
            Save pieces you love and they will stay here on this device.
          </p>
          <Link
            to="/collections"
            className="mt-10 inline-flex items-center px-6 py-3 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition"
          >
            Browse products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl pt-10 md:pt-16">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Saved locally
          </div>
          <h1 className="font-display text-5xl md:text-6xl mt-2">Wishlist</h1>
          <p className="mt-2 text-muted-foreground">
            {wishedProducts.length} saved {wishedProducts.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <Link to="/collections" className="text-sm text-muted-foreground hover:text-foreground">
          Continue shopping
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
        {wishedProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="group"
          >
            <Link to={`/product/${product._id}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <img
                  src={product.image?.[0]?.url}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    toggleWish(product._id);
                    toast.success("Removed from wishlist");
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-surface/90 backdrop-blur hover:bg-surface transition"
                  aria-label="Remove from wishlist"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {product.subCategory}
                  </div>
                  <div className="mt-1 text-sm font-medium truncate">{product.name}</div>
                </div>
                <div className="text-sm font-medium">{formatPrice(product.price)}</div>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => {
                add(product);
                toast.success(`${product.name} added to bag`);
              }}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
            >
              <ShoppingBag className="size-4" /> Add to bag
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
