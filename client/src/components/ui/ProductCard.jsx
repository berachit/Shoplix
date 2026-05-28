import { Link } from 'react-router-dom'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  if (!product) return null

  const { _id, name, price, image, category, subCategory, bestSeller, badge } = product
  const imgUrl = image?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=1000&fit=crop&q=80'

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.sizes?.[0] || 'M', 1)
  }

  return (
    <div className="product-card" style={{ cursor: 'pointer' }}>
      <Link to={`/product/${_id}`} style={{ textDecoration: 'none', display: 'block' }}>
        {/* Image wrapper */}
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '16px', backgroundColor: 'var(--muted)' }}>
          <img
            src={imgUrl}
            alt={name}
            className="product-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />

          {/* Badge */}
          {(badge || bestSeller) && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px',
              padding: '4px 10px', borderRadius: '999px',
              fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500,
              backgroundColor: 'rgba(245,244,240,0.92)', color: 'var(--foreground)',
              backdropFilter: 'blur(4px)',
            }}>
              {badge || (bestSeller ? 'Bestseller' : '')}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation() }}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: 'rgba(245,244,240,0.92)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            aria-label="Wishlist"
          >
            <Heart size={13} strokeWidth={1.75} />
          </button>

          {/* Quick add overlay */}
          <div
            className="quick-add-overlay"
            style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}
          >
            <button
              onClick={handleQuickAdd}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '7px', padding: '10px 16px', borderRadius: '12px',
                backgroundColor: 'var(--foreground)', color: 'var(--background)',
                border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                fontFamily: "'Inter', sans-serif", transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--foreground)'; e.currentTarget.style.color = 'var(--background)' }}
            >
              <ShoppingBag size={13} strokeWidth={1.75} />
              Quick add
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--muted-foreground)', marginBottom: '4px',
            }}>
              {subCategory || category}
            </p>
            <p style={{
              fontSize: '13px', fontWeight: 500, color: 'var(--foreground)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {name}
            </p>
          </div>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--foreground)', flexShrink: 0 }}>
            ${price?.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  )
}
