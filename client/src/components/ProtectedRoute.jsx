import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap any route with this to require login.
 *
 * How it works:
 * - If the user IS logged in  → render the page normally
 * - If the user is NOT logged in → redirect to /login
 *   and pass the page they tried to visit via `state.from`
 *   so after login they can be sent back to it.
 *
 * While auth state is still being loaded from localStorage
 * (the `loading` flag), we render nothing to avoid a flash.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Auth is still being read from localStorage — don't redirect yet
  if (loading) return null;

  if (!isAuthenticated) {
    // Save where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
