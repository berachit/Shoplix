import { formatPrice } from "../../utils/format";

const ORDERS = [
  { id: "SHX-10248", customer: "Eva Lindqvist", email: "eva@studio.se", date: "Mar 14", items: 1, total: 489, status: "Paid" },
  { id: "SHX-10247", customer: "Marcus Chen", email: "marcus@chen.io", date: "Mar 14", items: 2, total: 465, status: "Fulfilled" },
  { id: "SHX-10246", customer: "Aïcha Diallo", email: "a.diallo@mail.fr", date: "Mar 13", items: 1, total: 320, status: "Paid" },
  { id: "SHX-10245", customer: "Tomás Vega", email: "tomas@vega.es", date: "Mar 13", items: 3, total: 720, status: "Refunded" },
  { id: "SHX-10244", customer: "Yuki Tanaka", email: "yuki@tanaka.jp", date: "Mar 12", items: 1, total: 380, status: "Fulfilled" },
  { id: "SHX-10243", customer: "Noah Becker", email: "noah@becker.de", date: "Mar 12", items: 2, total: 540, status: "Paid" },
];

export default function AdminOrders() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Operations</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Orders</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", "Paid", "Fulfilled", "Refunded"].map((t, i) => (
          <button key={t} className={`px-4 py-1.5 rounded-full text-sm transition ${i === 0 ? "bg-foreground text-background" : "border hairline hover:bg-muted"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border hairline bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.16em] text-muted-foreground border-b hairline">
              <th className="font-normal py-3 px-6">Order</th>
              <th className="font-normal py-3">Customer</th>
              <th className="font-normal py-3">Date</th>
              <th className="font-normal py-3">Items</th>
              <th className="font-normal py-3">Status</th>
              <th className="font-normal py-3 px-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className="border-b hairline last:border-0 hover:bg-muted/40 transition">
                <td className="py-4 px-6 font-medium">{o.id}</td>
                <td className="py-4">
                  <div>{o.customer}</div>
                  <div className="text-xs text-muted-foreground">{o.email}</div>
                </td>
                <td className="py-4 text-muted-foreground">{o.date}</td>
                <td className="py-4">{o.items}</td>
                <td className="py-4">
                  <span className={`text-[11px] uppercase tracking-[0.16em] px-2 py-1 rounded-full ${
                    o.status === "Paid" ? "bg-accent/10 text-accent" :
                    o.status === "Fulfilled" ? "bg-foreground/10 text-foreground" :
                    "bg-destructive/10 text-destructive"
                  }`}>{o.status}</span>
                </td>
                <td className="py-4 px-6 text-right font-medium">{formatPrice(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
