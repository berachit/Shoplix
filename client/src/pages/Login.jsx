import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google"; // Changed from useGoogleLogin
import { loginUser, registerUser, googleAuthLogin } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send the encrypted credential token to your backend securely!
      const { data } = await googleAuthLogin({
        token: credentialResponse.credential,
      });

      if (data.success) {
        login(data.user, data.token);
        toast.success("Welcome, " + data.user.name + "!");
        navigate(from, { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success(mode === "signin" ? "Welcome Back" : "Account Created!");
        navigate(from, { replace: true });
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
            required
            placeholder="Email"
            className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition pr-12"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--foreground)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition hover:opacity-100 opacity-50"
              style={{ color: "var(--foreground)" }}
              tabIndex={-1}
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
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

      {mode === "signin" && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Are you an admin?{" "}
          <Link
            to="/admin/login"
            className="underline text-foreground hover:text-accent transition"
          >
            Login here
          </Link>
        </p>
      )}

      <div className="my-8 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" /> or continue with{" "}
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Official, cross-browser compatible Google button */}
      <GoogleLogin
        ux_mode="redirect"
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google sign-in was cancelled")}
        shape="circle"
        theme="outline"
        width="384px"
      />

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
