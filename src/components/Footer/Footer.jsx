// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold mb-2">ShopKart</h1>
          <p className="text-sm text-gray-400">Your one-stop shop for all things awesome.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline text-gray-300">Home</Link></li>
            <li><Link to="/products" className="hover:underline text-gray-300">Products</Link></li>
            <li><Link to="/cart" className="hover:underline text-gray-300">Cart</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-sm text-gray-400">Email: support@shopkart.com</p>
          <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-3">
            {/* Replace with real icons if needed */}
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-gray-900 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopKart. All rights reserved.
      </div>
    </footer>
  );
}
