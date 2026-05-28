import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto max-w-2xl py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto size-20 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="size-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-5xl mt-8">Your bag is quiet.</h1>
          <p className="mt-4 text-muted-foreground">
            Once you add a piece, it will live here until you're ready to checkout.
          </p>
          <Link to="/collections" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition">
            Discover the edit <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl pt-10 md:pt-16">
      <h1 className="font-display text-5xl md:text-6xl">Your bag</h1>
      <p className="mt-2 text-muted-foreground">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>

      <div className="mt-12 grid lg:grid-cols-12 gap-12">
        <ul className="lg:col-span-8 divide-y hairline border-y hairline">
          <AnimatePresence initial={false}>
            {items.map((it) => (
              <motion.li key={it.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-5 py-6"
              >
                <Link to={`/product/${it.product.slug}`} className="shrink-0">
                  <div className="size-28 sm:size-36 rounded-2xl overflow-hidden bg-muted">
                    <img src={it.product.images[0]} alt={it.product.name} className="h-full w-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{it.product.brand}</div>
                      <Link to={`/product/${it.product.slug}`} className="text-base font-medium hover:text-accent transition truncate block">
                        {it.product.name}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-1">{it.color} · Size {it.size}</div>
                    </div>
                    <div className="text-sm font-medium whitespace-nowrap">{formatPrice(it.product.price * it.qty)}</div>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center border hairline rounded-full">
                      <button onClick={() => setQty(it.id, it.qty - 1)} className="p-2 hover:bg-muted rounded-l-full"><Minus className="size-3.5" /></button>
                      <span className="w-9 text-center text-sm">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} className="p-2 hover:bg-muted rounded-r-full"><Plus className="size-3.5" /></button>
                    </div>
                    <button onClick={() => remove(it.id)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition">
                      <X className="size-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border hairline p-6 bg-surface">
            <h3 className="font-display text-2xl">Summary</h3>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Estimated tax</dt><dd>Calculated at checkout</dd></div>
            </dl>
            <div className="mt-6 pt-6 border-t hairline flex justify-between text-base font-medium">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
            <Link to="/checkout"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition">
              Checkout <ArrowRight className="size-4" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Free returns · Secure checkout · Lifetime repairs
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
