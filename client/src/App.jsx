import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import SearchPage from "./pages/SearchPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductNew from "./pages/admin/AdminProductNew";
import AdminOrders from "./pages/admin/AdminOrders";

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductNew />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
            <Route path="*" element={
              <div className="flex min-h-[70vh] items-center justify-center container-px">
                <div className="text-center max-w-md">
                  <div className="font-display text-7xl">404</div>
                  <p className="mt-3 text-muted-foreground">This page took a different route.</p>
                  <a href="/" className="mt-8 inline-flex items-center px-5 py-2.5 rounded-full bg-foreground text-background text-sm hover:bg-accent hover:text-accent-foreground transition">
                    Back to home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AnimatedRoutes />
        <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: "12px" } }} />
      </CartProvider>
    </BrowserRouter>
  );
}
