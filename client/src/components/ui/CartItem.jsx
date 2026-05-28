import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div
      className="flex gap-4 py-5 border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Image */}
      <div
        className="w-20 h-24 rounded-xl overflow-hidden shrink-0"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        {item.image && (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{item.name}</p>
            {item.size && (
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Size: {item.size}</p>
            )}
          </div>
          <p className="text-sm font-medium shrink-0" style={{ color: 'var(--foreground)' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        {/* Qty controls */}
        <div className="mt-3 flex items-center justify-between">
          <div
            className="flex items-center rounded-full border"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              className="p-2 hover:bg-black/5 rounded-l-full transition"
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              className="p-2 hover:bg-black/5 rounded-r-full transition"
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.key)}
            className="p-2 rounded-lg transition hover:bg-red-50"
            style={{ color: 'var(--muted-foreground)' }}
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
