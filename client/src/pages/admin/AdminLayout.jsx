import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Plus, ShoppingCart, ArrowLeft } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/products/new", label: "Add product", icon: Plus },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r hairline p-6 sticky top-0 h-screen">
        <Link to="/" className="font-display text-2xl">Shoplix<span className="text-accent">.</span></Link>
        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Admin Console</div>

        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
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

        <Link to="/" className="mt-auto inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Back to store
        </Link>
      </aside>
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
