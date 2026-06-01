import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Check } from "lucide-react";
import { formatPrice } from "../utils/format";
import { getUserOrders } from "../utils/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders()
      .then((res) => setOrders(res.data.orders ?? res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container-px mx-auto max-w-5xl pt-10 md:pt-16">
        <h1 className="font-display text-5xl md:text-6xl">Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Track and revisit past purchases.
        </p>
        <div className="mt-12 space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl border hairline p-5 sm:p-6 animate-pulse"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="size-20 rounded-xl bg-muted shrink-0" />
                <div className="flex-1 grid sm:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((m) => (
                    <div key={m}>
                      <div className="h-2.5 w-12 rounded bg-muted mb-2" />
                      <div className="h-3.5 w-20 rounded bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container-px mx-auto max-w-5xl pt-10 md:pt-16 text-center">
        <h1 className="font-display text-5xl md:text-6xl">Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Track and revisit past purchases.
        </p>
        <div className="mt-20">
          <Package className="mx-auto size-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No orders yet.</p>
          <Link
            to="/collections"
            className="mt-6 inline-block text-sm text-foreground underline underline-offset-4"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-5xl pt-10 md:pt-16">
      <h1 className="font-display text-5xl md:text-6xl">Orders</h1>
      <p className="mt-2 text-muted-foreground">
        Track and revisit past purchases.
      </p>

      <div className="mt-12 space-y-4">
        {orders.map((order, i) => {
          const firstItem = order.items?.[0];
          const itemCount = order.items?.length ?? 0;
          const formattedDate = new Date(order.createdAt).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          );

          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border hairline p-5 sm:p-6 hover:border-foreground/40 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="size-20 rounded-xl overflow-hidden bg-muted shrink-0">
                  {firstItem?.image && (
                    <img
                      src={firstItem.image}
                      alt={firstItem.name ?? ""}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 grid sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Order
                    </div>
                    <div className="font-medium mt-1">{order._id.slice(-8)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Placed
                    </div>
                    <div className="font-medium mt-1">{formattedDate}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Status
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1.5">
                      {order.status === "Delivered" ? (
                        <Check className="size-3.5 text-accent" />
                      ) : (
                        <Package className="size-3.5 text-accent" />
                      )}
                      <span className="font-medium">{order.status}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Total
                    </div>
                    <div className="font-medium mt-1">
                      {formatPrice(order.amount)} · {itemCount} item
                      {itemCount > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-full text-sm border hairline hover:bg-muted transition self-start">
                  View
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/collections"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Continue shopping →
        </Link>
      </div>
    </div>
  );
}
