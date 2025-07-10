import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../contexts/userSlice";

export default function Header() {
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600";

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopKart
        </Link>

        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={navLinkClass}>
              Cart
            </NavLink>
          </li>
        </ul>

        {status ? (
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 active:scale-95 transition duration-100"
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 active:scale-95 transition duration-100"
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 active:scale-95 transition duration-100"
              aria-label="Sign Up"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
