import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
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

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          },
        ).then((r) => r.json());

        const { data } = await googleAuthLogin({
          sub: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          email_verified: userInfo.email_verified,
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
    },
    onError: () => toast.error("Google sign-in was cancelled"),
  });

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

      console.log(response.data);

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
          {/* <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground"
            value={formData.password}
            onChange={handleChange}
          /> */}
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

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={handleGoogleLogin}
          className="py-3 rounded-xl border hairline text-sm hover:border-foreground transition flex items-center justify-center gap-2 w-full"
        >
          {/* Google G icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
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
