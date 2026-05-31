import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  Package,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const NAV = [
  { label: "New", to: "/collections?c=new" },
  { label: "Outerwear", to: "/collections?c=Outerwear" },
  { label: "Footwear", to: "/collections?c=Footwear" },
  { label: "Bags", to: "/collections?c=Bags" },
  { label: "Accessories", to: "/collections?c=Accessories" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "color-mix(in oklab, var(--surface) 78%, transparent)"
          : "transparent",
        borderColor: scrolled ? "var(--hairline)" : "transparent",
      }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-50 border-b backdrop-saturate-150 backdrop-blur-md"
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-6">
          <button
            className="md:hidden -ml-2 p-2 rounded-lg hover:bg-muted transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="font-display text-2xl tracking-tight">
            Shoplix<span className="text-accent">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-foreground/70 hover:text-foreground transition relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2 rounded-lg hover:bg-muted transition"
              aria-label="Search"
            >
              <Search className="size-[18px]" />
            </button>

            {/* ── User icon: dropdown when logged in, /login link when not ── */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="p-1.5 rounded-lg hover:bg-muted transition"
                  aria-label="Account menu"
                >
                  {/* Avatar circle with first letter of user's name */}
                  <span className="size-[26px] rounded-full bg-accent text-accent-foreground text-[11px] font-semibold flex items-center justify-center select-none">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-surface border hairline shadow-lg overflow-hidden z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b hairline">
                        <p className="text-sm font-medium truncate">
                          {user?.name ?? "Account"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="p-1.5 flex flex-col">
                        <Link
                          to="/orders"
                          className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl hover:bg-muted transition"
                        >
                          <Package className="size-4 text-muted-foreground" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl hover:bg-muted transition text-left text-red-500"
                        >
                          <LogOut className="size-4" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-lg hover:bg-muted transition hidden sm:inline-flex"
                aria-label="Sign in"
              >
                <User className="size-[18px]" />
              </Link>
            )}

            <Link
              to="/cart"
              className="p-2 rounded-lg hover:bg-muted transition hidden sm:inline-flex"
            >
              <Heart className="size-[18px]" />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-muted transition"
            >
              <ShoppingBag className="size-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim())
                  window.location.href = `/search?q=${encodeURIComponent(q)}`;
              }}
            >
              <div className="flex items-center gap-3 py-4 border-t hairline">
                <Search className="size-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search for overcoats, runners, cashmere…"
                  className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground/70"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-md hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-sm bg-surface md:hidden p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-2xl">
                  Shoplix<span className="text-accent">.</span>
                </span>
                <button onClick={() => setMenuOpen(false)} className="p-2">
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    className="py-3 text-xl font-display border-b hairline"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 text-sm">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 pb-3 border-b hairline">
                      <span className="size-8 rounded-full bg-accent text-accent-foreground text-sm font-semibold flex items-center justify-center">
                        {user?.name?.[0]?.toUpperCase() ?? "U"}
                      </span>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Package className="size-4" /> Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 text-left"
                    >
                      <LogOut className="size-4" /> Log out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="text-muted-foreground">
                    Sign in / Register
                  </Link>
                )}
                <Link to="/admin" className="text-muted-foreground">
                  Admin
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
