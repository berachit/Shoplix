import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../utils/api'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await loginUser(form)

      if (data.success && data.user?.role === 'admin') {
        login(data.user, data.token)
        navigate('/admin')
      } else {
        setError(data.message || 'Admin access required.')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] p-12 relative overflow-hidden"
        style={{ backgroundColor: 'var(--foreground)' }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--background) 1px, transparent 1px),
              linear-gradient(90deg, var(--background) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Accent glow blob */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition"
            style={{ color: 'var(--primary-foreground)' }}>
            <ArrowLeft className="size-3.5" />
            Back to store
          </Link>
        </div>

        <div className="relative z-10">
          <div
            className="text-6xl leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--primary-foreground)' }}
          >
            Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.25em] opacity-40"
            style={{ color: 'var(--primary-foreground)' }}>
            Admin Console
          </div>

          <p className="mt-10 text-lg leading-relaxed opacity-60"
            style={{ color: 'var(--primary-foreground)' }}>
            Manage your storefront, orders, and products from one unified place.
          </p>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { label: 'Orders', value: '312' },
              { label: 'Products', value: '84' },
              { label: 'Revenue', value: '48k' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-display" style={{ color: 'var(--primary-foreground)' }}>
                  {s.value}
                </div>
                <div className="text-xs opacity-40 mt-0.5" style={{ color: 'var(--primary-foreground)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 opacity-30"
          style={{ color: 'var(--primary-foreground)' }}>
          <ShieldCheck className="size-3.5" />
          <span className="text-xs tracking-wide">Secure admin access</span>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Mobile logo */}
        <div className="lg:hidden text-center mb-12">
          <div className="text-4xl font-display" style={{ color: 'var(--foreground)' }}>
            Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em]"
            style={{ color: 'var(--muted-foreground)' }}>
            Admin Console
          </div>
        </div>

        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--foreground)' }}
            >
              Welcome back
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl border p-7"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-[11px] uppercase tracking-[0.18em] mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Email address
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@shoplix.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition focus:border-foreground"
                  style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--foreground)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="admin-password"
                    className="block text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPass ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition pr-12"
                    style={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--foreground)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded transition hover:opacity-100 opacity-50"
                    style={{ color: 'var(--foreground)' }}
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-sm px-4 py-3 rounded-xl text-center"
                    style={{
                      backgroundColor: 'oklch(0.577 0.21 27 / 0.08)',
                      color: 'var(--destructive)',
                      border: '1px solid oklch(0.577 0.21 27 / 0.2)',
                    }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                id="admin-signin-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-medium transition mt-1 disabled:opacity-50 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Sign in to admin
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>

          {/* Hint */}
          <p className="mt-6 text-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Demo credentials:{' '}
            <button
              type="button"
              className="underline underline-offset-2 hover:opacity-80 transition"
              onClick={() => setForm({ email: 'admin@shoplix.com', password: 'shoplix1234' })}
            >
              autofill
            </button>
          </p>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs hover:opacity-80 transition"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <ArrowLeft className="size-3" />
              Return to store
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
