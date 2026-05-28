import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Check } from "lucide-react";
import { formatPrice } from "../utils/format";

const ORDERS = [
  { id: "SHX-10248", date: "Mar 14, 2026", status: "Delivered", total: 489, items: 1, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" },
  { id: "SHX-10199", date: "Feb 28, 2026", status: "In transit", total: 245, items: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
  { id: "SHX-10071", date: "Jan 12, 2026", status: "Delivered", total: 540, items: 2, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80" },
];

export default function Orders() {
  return (
    <div className="container-px mx-auto max-w-5xl pt-10 md:pt-16">
      <h1 className="font-display text-5xl md:text-6xl">Orders</h1>
      <p className="mt-2 text-muted-foreground">Track and revisit past purchases.</p>

      <div className="mt-12 space-y-4">
        {ORDERS.map((o, i) => (
          <motion.div key={o.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border hairline p-5 sm:p-6 hover:border-foreground/40 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="size-20 rounded-xl overflow-hidden bg-muted shrink-0">
                <img src={o.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 grid sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Order</div>
                  <div className="font-medium mt-1">{o.id}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Placed</div>
                  <div className="font-medium mt-1">{o.date}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Status</div>
                  <div className="mt-1 inline-flex items-center gap-1.5">
                    {o.status === "Delivered"
                      ? <Check className="size-3.5 text-accent" />
                      : <Package className="size-3.5 text-accent" />}
                    <span className="font-medium">{o.status}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Total</div>
                  <div className="font-medium mt-1">{formatPrice(o.total)} · {o.items} item{o.items > 1 ? "s" : ""}</div>
                </div>
              </div>
              <button className="px-4 py-2 rounded-full text-sm border hairline hover:bg-muted transition self-start">
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/collections" className="text-sm text-muted-foreground hover:text-foreground">Continue shopping →</Link>
      </div>
    </div>
  );
}
