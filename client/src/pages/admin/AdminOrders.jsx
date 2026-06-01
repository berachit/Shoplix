import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "../../utils/format";
import { listAllOrders, updateOrderStatus } from "../../utils/api";

const STATUSES = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out For Delivery",
  "Delivered",
  "Cancelled",
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await listAllOrders();
        if (data.success) setOrders(data.orders);
        else toast.error(data.message);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatus = async (orderId, status) => {
    try {
      const { data } = await updateOrderStatus(orderId, status);
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? data.updatedOrder : order)),
        );
        toast.success("Order status updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to update status");
    }
  };

  const visibleOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Operations</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Orders</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", ...STATUSES].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === status ? "bg-foreground text-background" : "border hairline hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border hairline bg-surface overflow-hidden">
        <div className="overflow-x-auto">
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
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b hairline">
                    <td className="py-4 px-6" colSpan={6}>
                      <div className="h-12 rounded bg-muted animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : visibleOrders.length === 0 ? (
                <tr>
                  <td className="py-12 px-6 text-center text-muted-foreground" colSpan={6}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                visibleOrders.map((order) => {
                  const customer = `${order.address?.firstName ?? ""} ${order.address?.lastName ?? ""}`.trim();
                  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={order._id} className="border-b hairline last:border-0 hover:bg-muted/40 transition">
                      <td className="py-4 px-6 font-medium font-mono text-xs">
                        {order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-4">
                        <div>{customer || "Customer"}</div>
                        <div className="text-xs text-muted-foreground">{order.address?.email}</div>
                      </td>
                      <td className="py-4 text-muted-foreground">{date}</td>
                      <td className="py-4">{order.items?.length ?? 0}</td>
                      <td className="py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatus(order._id, e.target.value)}
                          className="rounded-full border hairline bg-transparent px-3 py-1.5 text-xs outline-none"
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right font-medium">{formatPrice(order.amount)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
