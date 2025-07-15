import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart, clearCart , decreaseQuantity , increaseQuantity } from "../../contexts/cartSlice";

function Cart() {
  // const status = useSelector(state => state.user.status)
  const dispatch = useDispatch();
  const status = true;
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      {status ? (
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">
                Your cart is empty 🛒
              </p>
              <Link
                to="/products"
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 active:scale-95 transition duration-200"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-contain"
                      />
                      <div>
                        <h2 className="font-semibold text-lg mb-1 line-clamp-2">
                          {item.title}
                        </h2>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-blue-600 font-bold text-lg mb-1">
                        ₹{(item.price * item.quantity * 80).toFixed(0)}
                      </p>
                      <button
                        onClick={() => dispatch(removeCart(item.id))}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-right">
                <h2 className="text-2xl font-semibold">
                  {/* Total: ₹{(total * 80).toFixed(0)} */}
                </h2>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
          <p className="text-xl mb-4 text-gray-600">
            You must be logged in to view your cart.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 active:scale-95 transition duration-200"
          >
            Login Now
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
