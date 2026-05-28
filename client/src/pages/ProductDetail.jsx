import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Truck, RotateCcw, Shield, Minus, Plus, Heart, ShoppingBag, ChevronDown, ChevronRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { useCart } from '../context/CartContext'

// Demo data (swap with API)
const PRODUCTS = {
  '1': {
    _id: '1', name: 'Atelier Wool Overcoat', price: 489, compareAt: 590,
    category: 'Outerwear', subCategory: 'Shoplix Studio', badge: 'New',
    rating: 4.8, reviews: 214,
    description: 'A tailored long-line overcoat cut from Italian double-faced wool. Drop shoulder, notch lapel, and a quiet drape that holds its line through every season.',
    details: ['88% wool, 12% cashmere', 'Made in Portugal', 'Horn buttons', 'Dry clean only'],
    shipping: 'Free standard shipping on orders over $200. Express options at checkout. Free returns within 30 days.',
    care: 'Dry clean only. Store on a wide hanger to preserve the shoulder line.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=1500&fit=crop&q=80', public_id: '1' },
      { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=1500&fit=crop&q=80', public_id: '2' },
      { url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&h=1500&fit=crop&q=80', public_id: '3' },
    ],
  },
  '2': {
    _id: '2', name: 'Runner Low — Bone Leather', price: 245,
    category: 'Footwear', subCategory: 'Shoplix', bestSeller: true,
    rating: 4.9, reviews: 1820,
    description: 'A clean, low-profile runner with a tonal leather upper and a cushioned EVA midsole. Designed for daily wear with quiet detailing.',
    details: ['Full-grain leather upper', 'EVA midsole', 'Rubber outsole', 'Made in Italy'],
    shipping: 'Free standard shipping on orders over $200.',
    care: 'Clean with a soft, dry cloth. Condition leather periodically.',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    image: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1500&fit=crop&q=80', public_id: '1' },
      { url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&h=1500&fit=crop&q=80', public_id: '2' },
    ],
  },
}

const RELATED = [
  { _id: '3', name: 'Structured Leather Tote', price: 320, category: 'Bags', subCategory: 'Shoplix Studio', sizes: ['One Size'], image: [{ url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop&q=80', public_id: '3' }] },
  { _id: '4', name: 'Ribbed Cashmere Crew', price: 220, category: 'Knitwear', subCategory: 'Shoplix', badge: 'Limited', sizes: ['XS','S','M','L','XL'], image: [{ url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop&q=80', public_id: '4' }] },
  { _id: '5', name: 'Pleated Wool Trouser', price: 245, category: 'Outerwear', subCategory: 'Shoplix Studio', sizes: ['28','30','32','34'], image: [{ url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=1000&fit=crop&q=80', public_id: '5' }] },
  { _id: '6', name: 'Minimal Watch — Noir', price: 380, category: 'Accessories', subCategory: 'Shoplix Time', badge: 'New', sizes: ['One Size'], image: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=1000&fit=crop&q=80', public_id: '6' }] },
]

function Accordion({ title, children }) {
  const [open, setOpen] = useState(title === 'Details')
  return (
    <div className="border-b" style={{ borderColor: 'var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-sm font-medium"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
        <ChevronDown
          size={16}
          className="transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--muted-foreground)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '500px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="pb-5">{children}</div>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = PRODUCTS[id] || PRODUCTS['1']
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      <Navbar />

      <div className="container-px mx-auto max-w-7xl pt-8 md:pt-12 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--muted-foreground)' }}>
          <Link to="/" className="hover:text-foreground transition">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-foreground transition">Collections</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--foreground)' }}>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Images */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
            {/* Main image */}
            <div
              className="overflow-hidden rounded-3xl group"
              style={{ aspectRatio: '4/5', backgroundColor: 'var(--muted)' }}
            >
              <img
                src={product.image[activeImage]?.url}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            {product.image.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.image.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="overflow-hidden rounded-xl border-2 transition"
                    style={{
                      aspectRatio: '4/5',
                      borderColor: activeImage === i ? 'var(--foreground)' : 'transparent',
                      opacity: activeImage === i ? 1 : 0.6,
                      backgroundColor: 'var(--muted)',
                    }}
                  >
                    <img src={img.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted-foreground)' }}>
              {product.subCategory}
            </div>
            <h1
              className="text-4xl md:text-5xl mt-2 leading-tight"
              style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--foreground)' }}
            >
              {product.name}
            </h1>

            {/* Rating + Badge */}
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              {product.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} fill="currentColor" style={{ color: 'var(--foreground)' }} />
                  <span className="font-medium">{product.rating}</span>
                  <span style={{ color: 'var(--muted-foreground)' }}>({product.reviews?.toLocaleString()})</span>
                </div>
              )}
              {product.badge && (
                <span
                  className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'var(--muted)', color: 'var(--accent)' }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-medium">${product.price?.toFixed(2)}</span>
              {product.compareAt && (
                <span className="line-through text-base" style={{ color: 'var(--muted-foreground)' }}>
                  ${product.compareAt?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-sm" style={{ color: 'var(--muted-foreground)' }}>
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mt-8">
              <div className="flex justify-between text-xs uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--muted-foreground)' }}>
                <span>Size</span>
                <button className="hover:text-foreground transition">Size guide</button>
              </div>
              <div className={`grid gap-2 ${product.sizes?.length > 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                {product.sizes?.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="py-3 text-sm rounded-xl border transition"
                    style={{
                      borderColor: selectedSize === size ? 'var(--foreground)' : 'var(--border)',
                      backgroundColor: selectedSize === size ? 'var(--foreground)' : 'transparent',
                      color: selectedSize === size ? 'var(--background)' : 'var(--foreground)',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to bag + qty */}
            <div className="mt-8 flex items-stretch gap-3">
              {/* Qty */}
              <div
                className="flex items-center rounded-full border"
                style={{ borderColor: 'var(--border)' }}
              >
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-black/5 rounded-l-full transition"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 hover:bg-black/5 rounded-r-full transition"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add btn */}
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition"
                style={{
                  backgroundColor: added ? 'var(--accent)' : 'var(--foreground)',
                  color: added ? 'white' : 'var(--background)',
                }}
              >
                <ShoppingBag size={15} />
                {added ? 'Added!' : `Add to bag — $${(product.price * quantity).toFixed(2)}`}
              </button>

              {/* Wishlist */}
              <button
                className="p-3 rounded-full border transition hover:border-current"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Feature icons */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
              {[
                { Icon: Truck, label: 'Free shipping' },
                { Icon: RotateCcw, label: '30-day returns' },
                { Icon: Shield, label: 'Lifetime repairs' },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-2 p-3 rounded-xl"
                  style={{ backgroundColor: 'var(--muted)' }}
                >
                  <Icon size={15} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--foreground)', opacity: 0.8 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="mt-10 border-t" style={{ borderColor: 'var(--border)' }}>
              <Accordion title="Details">
                <ul className="space-y-1.5 text-sm list-disc pl-5" style={{ color: 'var(--muted-foreground)' }}>
                  {product.details?.map(d => <li key={d}>{d}</li>)}
                </ul>
              </Accordion>
              <Accordion title="Shipping & returns">
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{product.shipping}</p>
              </Accordion>
              <Accordion title="Care">
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{product.care}</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related products */}
        <section className="mt-24">
          <h2
            className="text-3xl md:text-4xl mb-10"
            style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--foreground)' }}
          >
            You may also like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
            {RELATED.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
