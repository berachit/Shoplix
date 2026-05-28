import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Products', icon: Package, to: '/admin/products' },
  { label: 'Orders', icon: ShoppingCart, to: '/admin/orders' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`flex flex-col h-full ${mobile ? 'w-full' : 'w-64'} shrink-0`}
      style={{ backgroundColor: 'var(--surface)', borderRight: mobile ? 'none' : '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div
        className="px-6 py-5 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--border)' }}
      >
        <Link
          to="/"
          className="font-display text-xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-black/5 transition">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Label */}
      <div
        className="px-6 py-3 text-[10px] uppercase tracking-[0.2em]"
        style={{ color: 'var(--muted-foreground)' }}
      >
        Admin Panel
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
              style={{
                backgroundColor: active ? 'var(--foreground)' : 'transparent',
                color: active ? 'var(--background)' : 'var(--muted-foreground)',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = 'var(--muted)'; e.currentTarget.style.color = 'var(--foreground)' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--muted-foreground)' } }}
            >
              <Icon size={16} />
              <span>{label}</span>
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition hover:bg-red-50"
          style={{ color: '#dc2626' }}
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 w-72 h-full shadow-2xl" style={{ backgroundColor: 'var(--surface)' }}>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 h-16 border-b shrink-0"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <button
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <div className="text-sm font-medium capitalize" style={{ color: 'var(--muted-foreground)' }}>
            {location.pathname.replace('/admin/', '')}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="text-xs px-3 py-1.5 rounded-full border transition hover:border-foreground"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
            >
              View store ↗
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
