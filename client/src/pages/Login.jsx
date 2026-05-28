import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [mode, setMode] = useState("signin");

  return (
    <div className="container-px mx-auto max-w-md py-16 md:py-24">
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground text-center">Shoplix Account</div>
      <h1 className="font-display text-5xl text-center mt-3">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
      <p className="mt-3 text-center text-muted-foreground text-sm">
        {mode === "signin" ? "Sign in to manage orders and your wishlist." : "It takes less than a minute."}
      </p>

      <div className="mt-10 p-1 rounded-full bg-muted flex">
        {["signin", "signup"].map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 text-sm rounded-full transition ${mode === m ? "bg-surface shadow-soft" : "text-muted-foreground"}`}>
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form key={mode}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-8 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {mode === "signup" && (
            <input placeholder="Full name" className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground" />
          )}
          <input type="email" placeholder="Email" className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground" />
          <input type="password" placeholder="Password" className="w-full bg-transparent border hairline rounded-xl px-4 py-3 text-sm outline-none focus:border-foreground" />
          <button className="w-full py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition">
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </motion.form>
      </AnimatePresence>

      <div className="my-8 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" /> or continue with <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {["Google", "Apple"].map((p) => (
          <button key={p} className="py-3 rounded-xl border hairline text-sm hover:border-foreground transition">{p}</button>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        By continuing, you agree to our <Link to="/" className="underline">Terms</Link> and <Link to="/" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
