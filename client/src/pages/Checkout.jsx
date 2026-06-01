import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Smartphone, Lock } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../utils/api";
import { formatPrice } from "../utils/format";

const Field = ({ label, value, onChange, ...props }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground mb-1.5">
      {label}
    </span>
    <input
      {...props}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground transition"
    />
  </label>
);

function Section({ step, title, children }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span className="size-7 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
          <Check className="size-3.5" />
        </span>
        <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {step}
        </span>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pay, setPay] = useState("card");
  const [loading, setLoading] = useState(false);

  const shipping = subtotal > 200 ? 0 : 12;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  const [address, setAddress] = useState({
    email: user?.email ?? "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    country: "India",
    phone: "",
  });

  const set = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto max-w-md py-32 text-center">
        <h1 className="font-display text-3xl">Nothing to checkout</h1>
        <Link to="/collections" className="mt-6 inline-block underline">
          Find something
        </Link>
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const paymentMethodMap = {
        card: "Stripe",
        upi: "Razorpay",
        cod: "COD",
      };

      const orderItems = items.map((it) => ({
        productId: it.product._id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.qty,
        size: it.size ?? "",
        image: it.product.image?.[0]?.url ?? "",
      }));

      const { data } = await placeOrder({
        address: {
          email: address.email,
          firstName: address.firstName,
          lastName: address.lastName,
          addressLine1: address.street,
          addressLine2: "",
          city: address.city,
          state: address.city,
          pinCode: Number(address.zipCode),
          country: address.country,
          phone: address.phone,
        },
        paymentMethod: paymentMethodMap[pay],
        items: orderItems,
        amount: total,
      });

      if (data.success) {
        clear();
        toast.success("Order placed! A confirmation is on its way.");
        navigate("/orders");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-px mx-auto max-w-7xl pt-10 md:pt-16">
      <Link
        to="/cart"
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        ← Back to bag
      </Link>
      <h1 className="font-display text-5xl md:text-6xl mt-3">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <Section step="01" title="Contact">
            <Field
              label="Email"
              type="email"
              required
              value={address.email}
              onChange={set("email")}
              placeholder="you@studio.com"
            />
          </Section>

          <Section step="02" title="Shipping">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="First name"
                required
                value={address.firstName}
                onChange={set("firstName")}
              />
              <Field
                label="Last name"
                required
                value={address.lastName}
                onChange={set("lastName")}
              />
              <Field
                label="Address"
                required
                value={address.street}
                onChange={set("street")}
              />
              <Field
                label="City"
                required
                value={address.city}
                onChange={set("city")}
              />
              <Field
                label="Postal code"
                required
                value={address.zipCode}
                onChange={set("zipCode")}
              />
              <Field
                label="Country"
                required
                value={address.country}
                onChange={set("country")}
              />
              <Field
                label="Phone"
                type="tel"
                required
                value={address.phone}
                onChange={set("phone")}
              />
            </div>
          </Section>

          <Section step="03" title="Payment">
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                ["card", "Card", CreditCard],
                ["upi", "UPI", Smartphone],
                ["cod", "Cash", Lock],
              ].map(([k, l, I]) => (
                <button
                  type="button"
                  key={k}
                  onClick={() => setPay(k)}
                  className={`flex flex-col items-center gap-1.5 py-4 rounded-xl border transition ${
                    pay === k
                      ? "border-foreground bg-foreground text-background"
                      : "hairline hover:border-foreground"
                  }`}
                >
                  <I className="size-4" />
                  <span className="text-xs">{l}</span>
                </button>
              ))}
            </div>
            {pay === "card" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <Field
                  label="Card number"
                  placeholder="0000 0000 0000 0000"
                  required
                />
                <Field label="Expiry" placeholder="MM / YY" required />
                <Field label="CVC" placeholder="123" required />
              </motion.div>
            )}
            {pay === "upi" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Field label="UPI ID" placeholder="yourname@upi" required />
              </motion.div>
            )}
          </Section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border hairline p-6 bg-surface">
            <h3 className="font-display text-2xl">Order</h3>
            <ul className="mt-6 space-y-4 max-h-72 overflow-y-auto pr-2">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3">
                  <div className="relative size-16 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img
                      src={it.product.image?.[0]?.url ?? it.product.images?.[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 size-5 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center">
                      {it.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {it.product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {it.size}
                    </div>
                  </div>
                  <div className="text-sm">
                    {formatPrice(it.product.price * it.qty)}
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 pt-6 border-t hairline space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
            </dl>
            <div className="mt-4 pt-4 border-t hairline flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition disabled:opacity-60"
            >
              {loading
                ? "Placing order…"
                : `Place order · ${formatPrice(total)}`}
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
              <Lock className="size-3" /> Secure checkout
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
