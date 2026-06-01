import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Plus, ShoppingCart, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const NAV = [
  { to: "/admin",          label: "Dashboard",  icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products",   icon: Package },
  { to: "/admin/products/new", label: "Add product", icon: Plus },
  { to: "/admin/orders",   label: "Orders",     icon: ShoppingCart },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r hairline p-6 sticky top-0 h-screen">
        <Link to="/" className="font-display text-2xl">
          Shoplix<span className="text-accent">.</span>
        </Link>
        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Admin Console</div>

        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to) && !(n.to === "/admin/products" && pathname === "/admin/products/new");
            return (
              <Link key={n.to} to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                  active ? "bg-foreground text-background" : "hover:bg-muted text-foreground/80"
                }`}>
                <n.icon className="size-4" /> {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" /> Back to store
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition"
          >
            <LogOut className="size-3.5" /> Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
