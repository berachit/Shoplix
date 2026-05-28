import { Link } from 'react-router-dom'

const SHOP_LINKS = ['New', 'Outerwear', 'Footwear', 'Bags', 'Knitwear', 'Accessories']
const CARE_LINKS = ['Orders', 'Returns', 'Shipping', 'Contact']
const STUDIO_LINKS = ['About', 'Sustainability', 'Press', 'Stockists']

export default function Footer() {
  return (
    <footer
      className="border-t mt-32"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-12 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div
            className="font-display text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Shoplix<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            A modern atelier for everyday essentials. Designed in-house, made in small runs across Europe.
          </p>

          {/* Newsletter */}
          <form
            className="mt-8 flex max-w-sm rounded-full border overflow-hidden"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Subscribe for new arrivals"
              className="flex-1 bg-transparent px-5 text-sm outline-none"
              style={{ color: 'var(--foreground)' }}
            />
            <button
              type="submit"
              className="text-sm font-medium px-5 py-3 transition shrink-0"
              style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent-foreground)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--foreground)'
                e.currentTarget.style.color = 'var(--background)'
              }}
            >
              Join
            </button>
          </form>

          {/* Social */}
          <div className="mt-6 flex items-center gap-3">
            {/* Instagram SVG */}
            <a href="#" className="p-2 rounded-full border transition hover:border-foreground"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* X (Twitter) SVG */}
            <a href="#" className="p-2 rounded-full border transition hover:border-foreground"
              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }} aria-label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Shop
            </div>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l}>
                  <Link
                    to={`/collections?category=${l}`}
                    className="transition"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--foreground)'}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Care
            </div>
            <ul className="space-y-3">
              {CARE_LINKS.map((l) => (
                <li key={l}>
                  <Link
                    to={l === 'Orders' ? '/orders' : '#'}
                    className="transition"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--foreground)'}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Studio
            </div>
            <ul className="space-y-3">
              {STUDIO_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="transition"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--foreground)'}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div
          className="container-px mx-auto max-w-7xl py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span>© {new Date().getFullYear()} Shoplix Studio. All rights reserved.</span>
          <span>Designed with intent · Made with care</span>
        </div>
      </div>
    </footer>
  )
}
