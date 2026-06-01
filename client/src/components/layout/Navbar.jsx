import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'New', to: '/collections?category=new' },
  { label: 'Outerwear', to: '/collections?category=Outerwear' },
  { label: 'Footwear', to: '/collections?category=Footwear' },
  { label: 'Bags', to: '/collections?category=Bags' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMobileOpen(false)
      setSearchOpen(false)
      setUserMenuOpen(false)
    }, 0)
    return () => window.clearTimeout(id)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-glass shadow-sm' : 'bg-transparent border-b border-transparent'}`}
      >
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-black/5 transition"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-display text-[22px] tracking-tight shrink-0"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--foreground)' }}
            >
              Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="relative nav-link text-sm transition-colors duration-200"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--foreground)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-0.5">
              {/* Search */}
              <button
                className="p-2.5 rounded-xl transition hover:bg-black/5"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.75} />
              </button>

              {/* User */}
              {isAuthenticated ? (
                <div className="relative hidden sm:block">
                  <button
                    className="p-2.5 rounded-xl transition hover:bg-black/5"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="Account"
                  >
                    <User size={18} strokeWidth={1.75} />
                  </button>
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl border py-2 shadow-2xl z-50 animate-scale-in"
                      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    >
                      <Link to="/orders" className="block px-4 py-2.5 text-sm transition hover:bg-black/5">My Orders</Link>
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="block px-4 py-2.5 text-sm transition hover:bg-black/5">Admin Panel</Link>
                      )}
                      <div className="my-1.5 border-t" style={{ borderColor: 'var(--border)' }} />
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="block w-full text-left px-4 py-2.5 text-sm transition hover:bg-red-50"
                        style={{ color: '#dc2626' }}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="p-2.5 rounded-xl transition hover:bg-black/5 hidden sm:inline-flex" aria-label="Sign in">
                  <User size={18} strokeWidth={1.75} />
                </Link>
              )}

              {/* Wishlist */}
              <button className="p-2.5 rounded-xl transition hover:bg-black/5 hidden sm:inline-flex" aria-label="Wishlist">
                <Heart size={18} strokeWidth={1.75} />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2.5 rounded-xl transition hover:bg-black/5" aria-label="Shopping bag">
                <ShoppingBag size={18} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] rounded-full text-[10px] font-semibold flex items-center justify-center leading-none"
                    style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Search overlay ── */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-50 animate-fade-in"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSearchOpen(false)}
          />
          <div
            className="fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-scale-in"
            style={{ top: '80px' }}
          >
            <form
              onSubmit={handleSearch}
              className="rounded-2xl border shadow-2xl flex items-center gap-3 px-5 py-4"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
            >
              <Search size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
              <input
                autoFocus
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--foreground)' }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg hover:bg-black/5 transition shrink-0"
              >
                <X size={15} />
              </button>
            </form>
          </div>
        </>
      )}

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 animate-fade-in"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed left-0 top-0 z-50 h-full w-[300px] shadow-2xl flex flex-col animate-fade-in"
            style={{ backgroundColor: 'var(--background)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="font-display text-xl"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-black/5 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-4 pt-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="flex items-center justify-between px-3 py-3.5 rounded-xl text-sm font-medium transition hover:bg-black/5"
                  style={{ color: 'var(--foreground)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom actions */}
            <div
              className="mt-auto border-t px-4 py-6 space-y-2"
              style={{ borderColor: 'var(--border)' }}
            >
              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    className="block px-3 py-3 rounded-xl text-sm hover:bg-black/5 transition"
                  >
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-3 rounded-xl text-sm hover:bg-black/5 transition"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-3 rounded-xl text-sm transition hover:bg-red-50"
                    style={{ color: '#dc2626' }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-medium transition"
                  style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
