import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { loginUser, registerUser } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  // If ProtectedRoute redirected here, it saved where the user came from
  const from = location.state?.from?.pathname || "/";
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (!formData.email || !formData.password) {
        return toast.error("Please fill all fields");
      }

      if (mode === "signup" && !formData.name) {
        return toast.error("Please enter your name");
      }

      if (mode === "signin") {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await registerUser(formData);
      }

      console.log(response.data);

      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success(mode === "signin" ? "Welcome Back" : "Account Created!");
        navigate(from, { replace: true }); // ← go back to where they came from
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-px mx-auto max-w-md py-16 md:py-24">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground text-center">
        Shoplix Account
      </div>
      <h1 className="font-display text-5xl text-center mt-3">
        {mode === "signin" ? "Welcome back" : "Create account"}
      </h1>
      <p className="mt-3 text-center text-muted-foreground text-sm">
        {mode === "signin"
          ? "Sign in to manage orders and your wishlist."
          : "It takes less than a minute."}
      </p>

      <div className="mt-10 p-1 rounded-full bg-muted flex">
        {["signin", "signup"].map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-sm rounded-full transition ${mode === m ? "bg-surface shadow-soft" : "text-muted-foreground"}`}
          >
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-8 space-y-4"
          onSubmit={handleSubmit}
        >
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </motion.form>
      </AnimatePresence>

      <div className="my-8 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" /> or continue with{" "}
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          key="google"
          className="py-3 rounded-xl border hairline text-sm hover:border-foreground transition"
        >
          Google
        </button>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link to="/" className="underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link to="/" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
