// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">ShopKart</Link>

        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
          <li><Link to="/cart" className="hover:text-blue-600">Cart</Link></li>
        </ul>

        <Link to="/login" className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
          Login
        </Link>
      </div>
    </nav>
  );
}
