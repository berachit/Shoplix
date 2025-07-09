// src/components/CartItem.jsx
export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex gap-4 items-center border-b py-4">
      <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{item.title}</h4>
        <p className="text-gray-600 text-sm">₹{item.price}</p>
        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 text-sm hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
