import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export function ProductCard({ product, index = 0 }) {
  const { add, toggleWish, wishlist } = useCart();
  const [hover, setHover] = useState(false);
  const wished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />
          <motion.img
            src={product.images[1] ?? product.images[0]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur text-[10px] uppercase tracking-[0.18em] font-medium">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWish(product.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-surface/90 backdrop-blur hover:bg-surface transition"
            aria-label="Wishlist"
          >
            <Heart
              className={`size-4 transition ${wished ? "fill-accent text-accent" : ""}`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{ y: hover ? 0 : 14, opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-3 bottom-3"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product);
                toast.success(`${product.name} added to bag`);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
            >
              <ShoppingBag className="size-4" /> Quick add
            </button>
          </motion.div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {product.brand}
            </div>
            <div className="mt-1 text-sm font-medium truncate">
              {product.name}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {formatPrice(product.price)}
            </div>
            {product.compareAt && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
