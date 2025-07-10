// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProductCard({ product }) {
  const status = useSelector((state) => state.user.status)
  const inrPrice = (product.price * 80).toFixed(0);

  const addToCartHandler = () => {
    if(!status){
      alert("Login First!!")
    }
  }

  return (
    <div className="flex flex-col justify-between border rounded-lg shadow hover:shadow-md transition p-4 w-full max-w-xs bg-white h-full">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-44 object-contain mb-4"
        />

        <div className="flex-grow">
          <h3 className="text-sm font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
          <p className="text-blue-600 font-bold mb-4">₹{inrPrice}</p>
        </div>
      </Link>

      <button className="mt-auto w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 active:scale-95 transition duration-200"
      onClick={addToCartHandler}>
        <FaShoppingCart className="text-sm" />
        Add to Cart
      </button>
    </div>
  );
}
