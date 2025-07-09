// src/pages/Home.jsx
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const featuredProducts = useLoaderData().slice(0, 8); // show top 8

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="bg-gray-100 py-10 text-center rounded-md mb-12">
        <h1 className="text-3xl font-bold mb-2">Welcome to ShopKart</h1>
        <p className="mb-4 text-gray-600">Find the best products at unbeatable prices!</p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
