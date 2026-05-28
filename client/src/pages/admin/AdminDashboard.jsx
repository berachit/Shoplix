import { motion } from "framer-motion";
import { ArrowUpRight, DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { formatPrice } from "../../utils/format";

const STATS = [
  { label: "Revenue", value: 48290, fmt: formatPrice, delta: "+12.4%", icon: DollarSign },
  { label: "Orders", value: 312, fmt: (n) => n.toString(), delta: "+8.1%", icon: ShoppingBag },
  { label: "Customers", value: 1840, fmt: (n) => n.toString(), delta: "+4.2%", icon: Users },
  { label: "Avg. order", value: 154, fmt: formatPrice, delta: "+2.7%", icon: TrendingUp },
];

const RECENT = [
  { id: "SHX-10248", customer: "Eva Lindqvist", item: "Atelier Wool Overcoat", total: 489, status: "Paid" },
  { id: "SHX-10247", customer: "Marcus Chen", item: "Runner Low — Bone Leather", total: 245, status: "Fulfilled" },
  { id: "SHX-10246", customer: "Aïcha Diallo", item: "Structured Leather Tote", total: 320, status: "Paid" },
  { id: "SHX-10245", customer: "Tomás Vega", item: "Ribbed Cashmere Crew", total: 220, status: "Refunded" },
  { id: "SHX-10244", customer: "Yuki Tanaka", item: "Minimal Watch — Noir", total: 380, status: "Fulfilled" },
];

const sparkline = (vals) => {
  const max = Math.max(...vals); const min = Math.min(...vals);
  const w = 100, h = 28;
  return vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
};

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Overview</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Good morning, Studio.</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm rounded-full border hairline hover:bg-muted">Last 30 days</button>
          <button className="px-4 py-2 text-sm rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition">Export</button>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border hairline p-5 bg-surface hover:shadow-soft transition"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className="size-4 text-accent" />
              </div>
            </div>
            <div className="mt-4 text-3xl font-display">{s.fmt(s.value)}</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-accent">
              <ArrowUpRight className="size-3.5" /> {s.delta} vs last period
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border hairline p-6 bg-surface">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl">Revenue</h2>
            <span className="text-xs text-muted-foreground">Last 14 days</span>
          </div>
          <svg viewBox="0 0 100 28" className="w-full h-48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.12 162)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="oklch(0.55 0.12 162)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const vals = [12, 18, 14, 22, 20, 26, 24, 30, 28, 34, 32, 38, 35, 42];
              const pts = sparkline(vals);
              return (
                <>
                  <polygon points={`0,28 ${pts} 100,28`} fill="url(#g)" />
                  <polyline points={pts} fill="none" stroke="oklch(0.55 0.12 162)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
                </>
              );
            })()}
          </svg>
        </div>

        <div className="rounded-2xl border hairline p-6 bg-surface">
          <h2 className="font-display text-xl mb-6">Top categories</h2>
          <div className="space-y-4">
            {[["Outerwear", 78], ["Footwear", 62], ["Knitwear", 48], ["Bags", 34], ["Accessories", 22]].map(([cat, pct]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{cat}</span><span className="text-muted-foreground">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border hairline bg-surface overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="font-display text-xl">Recent orders</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.16em] text-muted-foreground border-y hairline">
                <th className="font-normal py-3 px-6">Order</th>
                <th className="font-normal py-3">Customer</th>
                <th className="font-normal py-3">Item</th>
                <th className="font-normal py-3">Status</th>
                <th className="font-normal py-3 px-6 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r) => (
                <tr key={r.id} className="border-b hairline last:border-0 hover:bg-muted/40 transition">
                  <td className="py-4 px-6 font-medium">{r.id}</td>
                  <td className="py-4">{r.customer}</td>
                  <td className="py-4 text-muted-foreground">{r.item}</td>
                  <td className="py-4">
                    <span className={`text-[11px] uppercase tracking-[0.16em] px-2 py-1 rounded-full ${
                      r.status === "Paid" ? "bg-accent/10 text-accent" :
                      r.status === "Fulfilled" ? "bg-foreground/8 text-foreground" :
                      "bg-destructive/10 text-destructive"
                    }`}>{r.status}</span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium">{formatPrice(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
