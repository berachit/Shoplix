import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";
import { listOne, listProducts } from "../utils/api";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";
import { formatPrice } from "../utils/format";

export default function ProductPage() {
  const { id } = useParams();

  const { add, toggleWish, wishlist } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [size,      setSize]      = useState(null);
  const [qty,       setQty]       = useState(1);
  const [openInfo,  setOpenInfo]  = useState("details");

  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setActiveImg(0);
      try {
        const { data } = await listOne(id);
        if (data.success && data.product) {
          setProduct(data.product);
          setSize(data.product.sizes?.[0] ?? null);
          const rel = await listProducts({ category: data.product.category, limit: 4 });
          if (rel.data.success) {
            setRelated(rel.data.products.filter((p) => p._id !== id).slice(0, 4));
          }
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="container-px mx-auto max-w-7xl pt-8 md:pt-12 animate-pulse">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mt-6">
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] rounded-3xl bg-muted" />
            <div className="mt-3 grid grid-cols-4 gap-3">
              {[0,1,2].map(i => <div key={i} className="aspect-[4/5] rounded-xl bg-muted" />)}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-4 pt-4">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-10 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/3 rounded bg-muted" />
            <div className="h-20 w-full rounded bg-muted mt-6" />
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (notFound || !product) {
    return (
      <div className="container-px mx-auto max-w-7xl py-32 text-center">
        <h1 className="font-display text-5xl">Product not found</h1>
        <Link to="/collections" className="mt-6 inline-block underline">Back to collections</Link>
      </div>
    );
  }

  const wished = wishlist.includes(product._id);
  const images = product.image ?? [];

  return (
    <div className="container-px mx-auto max-w-7xl pt-8 md:pt-12">
      <div className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        <Link to="/collections" className="hover:text-foreground">{product.category}</Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mt-6">
        {/* ── Gallery ── */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted group"
          >
            <img
              src={images[activeImg]?.url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`aspect-[4/5] rounded-xl overflow-hidden border-2 transition ${
                    i === activeImg ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                  }`}>
                  <img src={img.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Buy panel ── */}
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {product.subCategory}
          </div>
          <h1 className="font-display text-4xl md:text-5xl mt-2 text-balance">{product.name}</h1>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-medium">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                <span>Size · {size}</span>
                <button className="hover:text-foreground">Size guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`py-3 text-sm rounded-xl border transition ${
                      size === s ? "border-foreground bg-foreground text-background" : "hairline hover:border-foreground"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to bag */}
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
              onClick={() => {
                add(product, { size, qty });
                toast.success(`Added ${qty} × ${product.name}`);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
            >
              <ShoppingBag className="size-4" /> Add to bag — {formatPrice(product.price * qty)}
            </button>
            <button
              onClick={() => toggleWish(product._id)}
              className="p-3 rounded-full border hairline hover:border-foreground transition"
              aria-label="Wishlist"
            >
              <Heart className={`size-5 ${wished ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>

          {/* Perks */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              [Truck,     "Free India shipping"],
              [RotateCcw, "30-day returns"],
              [Shield,    "Lifetime repairs"],
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
              {
                id: "details",
                label: "Details",
                body: product.details?.length ? (
                  <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                    {product.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No details available.</p>
                ),
              },
              {
                id: "shipping",
                label: "Shipping & returns",
                body: (
                  <p className="text-sm text-muted-foreground">
                    Free standard shipping on orders over ₹5000. Express options at checkout. Free returns within 30 days.
                  </p>
                ),
              },
              {
                id: "care",
                label: "Care",
                body: (
                  <p className="text-sm text-muted-foreground">
                    {product.care ?? "Please refer to the garment's care label."}
                  </p>
                ),
              },
            ].map((a) => (
              <div key={a.id} className="border-b hairline">
                <button
                  onClick={() => setOpenInfo((p) => (p === a.id ? null : a.id))}
                  className="w-full flex items-center justify-between py-5 text-sm font-medium"
                >
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

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="mt-32">
          <h2 className="font-display text-3xl md:text-4xl mb-10">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
            {related.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
