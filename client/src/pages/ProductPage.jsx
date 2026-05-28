import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";
import { getProduct, getRelated } from "../services/products";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";
import { formatPrice } from "../utils/format";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const related = getRelated(slug);

  const { add, toggleWish, wishlist } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product?.sizes[0]);
  const [color, setColor] = useState(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [openInfo, setOpenInfo] = useState("details");

  if (!product) {
    return (
      <div className="container-px mx-auto max-w-7xl py-32 text-center">
        <h1 className="font-display text-5xl">Product not found</h1>
        <Link to="/collections" className="mt-6 inline-block underline">Back to collections</Link>
      </div>
    );
  }

  const wished = wishlist.includes(product.id);

  return (
    <div className="container-px mx-auto max-w-7xl pt-8 md:pt-12">
      <div className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        <Link to="/collections" className="hover:text-foreground">{product.category}</Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mt-6">
        {/* Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted group"
          >
            <img src={product.images[activeImg]} alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`aspect-[4/5] rounded-xl overflow-hidden border-2 transition ${
                  i === activeImg ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                }`}>
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy panel */}
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{product.brand}</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2 text-balance">{product.name}</h1>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Star className="size-4 fill-foreground" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews})</span>
            </div>
            {product.badge && (
              <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-accent/10 text-accent">
                {product.badge}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-medium">{formatPrice(product.price)}</span>
            {product.compareAt && <span className="text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color */}
          <div className="mt-8">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Color · {color}</div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)}
                  className={`px-4 py-2 text-sm rounded-full border transition ${
                    color === c ? "border-foreground bg-foreground text-background" : "hairline hover:border-foreground"
                  }`}>{c}</button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="flex justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              <span>Size</span><button className="hover:text-foreground">Size guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`py-3 text-sm rounded-xl border transition ${
                    size === s ? "border-foreground bg-foreground text-background" : "hairline hover:border-foreground"
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty + actions */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border hairline rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-muted rounded-l-full transition">
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-muted rounded-r-full transition">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={() => { add(product, { size, color, qty }); toast.success(`Added ${qty} × ${product.name}`); }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
            >
              <ShoppingBag className="size-4" /> Add to bag — {formatPrice(product.price * qty)}
            </button>
            <button onClick={() => toggleWish(product.id)}
              className="p-3 rounded-full border hairline hover:border-foreground transition" aria-label="Wishlist">
              <Heart className={`size-5 ${wished ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>

          {/* Perks */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              [Truck, "Free EU shipping"],
              [RotateCcw, "30-day returns"],
              [Shield, "Lifetime repairs"],
            ].map(([Icon, label], i) => (
              <div key={i} className="flex flex-col items-start gap-1.5 p-3 rounded-xl bg-muted/60">
                <Icon className="size-4 text-accent" />
                <span className="text-foreground/80">{label}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="mt-10 border-t hairline">
            {[
              { id: "details", label: "Details", body: (
                <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                  {product.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )},
              { id: "shipping", label: "Shipping & returns", body: (
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on orders over $200. Express options at checkout. Free returns within 30 days.
                </p>
              )},
              { id: "care", label: "Care", body: (
                <p className="text-sm text-muted-foreground">Dry clean only. Store on a wide hanger to preserve the shoulder line.</p>
              )},
            ].map((a) => (
              <div key={a.id} className="border-b hairline">
                <button onClick={() => setOpenInfo((p) => (p === a.id ? null : a.id))}
                  className="w-full flex items-center justify-between py-5 text-sm font-medium">
                  {a.label}
                  <Plus className={`size-4 transition-transform ${openInfo === a.id ? "rotate-45" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openInfo === a.id ? "auto" : 0, opacity: openInfo === a.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-5">{a.body}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-32">
        <h2 className="font-display text-3xl md:text-4xl mb-10">You may also like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
