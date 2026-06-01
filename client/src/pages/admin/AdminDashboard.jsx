import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";
import { formatPrice } from "../../utils/format";
import { listAllOrders, listProducts } from "../../utils/api";

const sparkline = (vals) => {
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const w = 100, h = 28;
  return vals
    .map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`)
    .join(" ");
};

const STATUS_COLORS = {
  "Order Placed": "bg-accent/10 text-accent",
  Processing:     "bg-blue-500/10 text-blue-500",
  Shipped:        "bg-purple-500/10 text-purple-500",
  "Out For Delivery": "bg-orange-500/10 text-orange-500",
  Delivered:      "bg-foreground/10 text-foreground",
  Cancelled:      "bg-destructive/10 text-destructive",
};

export default function AdminDashboard() {
  const [orders,   setOrders]   = useState([]);
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [oRes, pRes] = await Promise.all([listAllOrders(), listProducts({ limit: 1000 })]);
        if (oRes.data.success)  setOrders(oRes.data.orders);
        if (pRes.data.success)  setProducts(pRes.data.products);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const revenue    = orders.reduce((s, o) => s + (o.amount ?? 0), 0);
  const avgOrder   = orders.length ? revenue / orders.length : 0;
  const recent     = orders.slice(0, 5);

  const STATS = [
    { label: "Revenue",   value: revenue,          fmt: formatPrice,          delta: orders.length + " orders", icon: DollarSign },
    { label: "Orders",    value: orders.length,    fmt: (n) => n.toLocaleString(), delta: "total placed",     icon: ShoppingBag },
    { label: "Products",  value: products.length,  fmt: (n) => n.toLocaleString(), delta: "in catalog",       icon: Package },
    { label: "Avg. order",value: avgOrder,         fmt: formatPrice,          delta: "per order",             icon: TrendingUp },
  ];

  const chartVals = (() => {
    const map = {};
    orders.forEach((o) => {
      const day = new Date(o.createdAt).toLocaleDateString();
      map[day] = (map[day] || 0) + (o.amount ?? 0);
    });
    const vals = Object.values(map).slice(-14);
    return vals.length >= 2 ? vals : [0, 0, ...vals];
  })();

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Overview</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Good morning, Studio.</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's happening today.</p>
        </div>
        <Link to="/admin/orders" className="px-4 py-2 text-sm rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition">
          View all orders
        </Link>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border hairline p-5 bg-surface"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className="size-4 text-accent" />
              </div>
            </div>
            <div className="mt-4 text-3xl font-display">
              {loading ? <div className="h-8 w-24 rounded bg-muted animate-pulse" /> : s.fmt(s.value)}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowUpRight className="size-3.5 text-accent" /> {s.delta}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border hairline p-6 bg-surface">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl">Revenue</h2>
            <span className="text-xs text-muted-foreground">Last {chartVals.length} days</span>
          </div>
          {loading ? (
            <div className="h-48 rounded-xl bg-muted animate-pulse" />
          ) : (
            <svg viewBox="0 0 100 28" className="w-full h-48" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="oklch(0.55 0.12 162)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="oklch(0.55 0.12 162)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {chartVals.length >= 2 && (() => {
                const pts = sparkline(chartVals);
                return (
                  <>
                    <polygon points={`0,28 ${pts} 100,28`} fill="url(#g)" />
                    <polyline points={pts} fill="none" stroke="oklch(0.55 0.12 162)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                  </>
                );
              })()}
            </svg>
          )}
        </div>

        <div className="rounded-2xl border hairline p-6 bg-surface">
          <h2 className="font-display text-xl mb-6">By status</h2>
          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-6 rounded bg-muted animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-4">
              {["Order Placed", "Delivered", "Shipped", "Cancelled"].map((status) => {
                const count = orders.filter((o) => o.status === status).length;
                const pct   = orders.length ? Math.round((count / orders.length) * 100) : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>{status}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border hairline bg-surface overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="font-display text-xl">Recent orders</h2>
          <Link to="/admin/orders" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.16em] text-muted-foreground border-y hairline">
                <th className="font-normal py-3 px-6">Order ID</th>
                <th className="font-normal py-3">Customer</th>
                <th className="font-normal py-3">Items</th>
                <th className="font-normal py-3">Status</th>
                <th className="font-normal py-3 px-6 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b hairline">
                      {[1,2,3,4,5].map(j => (
                        <td key={j} className="py-4 px-6">
                          <div className="h-3 rounded bg-muted animate-pulse w-20" />
                        </td>
                      ))}
                    </tr>
                  ))
                : recent.map((r) => (
                    <tr key={r._id} className="border-b hairline last:border-0 hover:bg-muted/40 transition">
                      <td className="py-4 px-6 font-medium font-mono text-xs">{r._id.slice(-8).toUpperCase()}</td>
                      <td className="py-4">{r.address?.firstName} {r.address?.lastName}</td>
                      <td className="py-4 text-muted-foreground">{r.items?.length} item{r.items?.length !== 1 ? "s" : ""}</td>
                      <td className="py-4">
                        <span className={`text-[11px] uppercase tracking-[0.16em] px-2 py-1 rounded-full ${STATUS_COLORS[r.status] ?? "bg-muted text-foreground"}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-medium">{formatPrice(r.amount)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
