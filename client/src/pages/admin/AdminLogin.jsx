import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

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
      // TODO: Replace with real admin login API
      await new Promise(r => setTimeout(r, 800))
      if (form.email === 'admin@shoplix.com' && form.password === 'shoplix1234') {
        login({ name: 'Admin', email: form.email, role: 'admin' }, 'admin-demo-token')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid admin credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="text-4xl mb-3"
            style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--foreground)' }}
          >
            Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--muted-foreground)' }}>
            Admin Portal
          </p>
        </div>

        <div
          className="rounded-2xl p-8 border"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <h1 className="text-2xl font-semibold mb-1">Admin sign in</h1>
          <p className="text-sm mb-7" style={{ color: 'var(--muted-foreground)' }}>
            Access the Shoplix admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                placeholder="admin@shoplix.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition pr-11"
                  style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                {error}
              </p>
            )}

            <button
              id="admin-signin-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-medium transition mt-2 disabled:opacity-60"
              style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
            >
              {loading ? 'Signing in…' : 'Sign in to admin'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Default: admin@shoplix.com / shoplix1234
          </p>
        </div>
      </div>
    </div>
  )
}
