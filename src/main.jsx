import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Cart, Home, Products } from "./index.js";

export const fakeStoreLoader = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} loader={fakeStoreLoader}/>
      <Route path="products" element={<Products />} loader={fakeStoreLoader} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
