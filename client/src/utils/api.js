import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("shoplix_token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const registerUser = (data) => {
  return api.post("/api/user/register", data);
};
export const loginUser = (data) => {
  return api.post("/api/user/login", data);
};
export const googleAuthLogin = (data) => {
  return api.post("/api/user/google", data);
};

export const listProducts = (params) => {
  return api.get("/api/product/listAll", { params });
};
export const listOne = (productId) => {
  return api.get(`/api/product/listOne/${productId}`);
};
export const addProduct = (data) => {
  return api.post("/api/product/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteProduct = (productId) =>
  api.post(`/api/product/delete/${productId}`);

export const getCart = () => api.get("/api/cart/get");
export const addToCartApi = (productId) =>
  api.post("/api/cart/add", { productId });
export const updateCartApi = (productId, quantity) =>
  api.post("/api/cart/update", { productId, quantity });
export const removeFromCartApi = (productId) =>
  api.post("/api/cart/remove", { productId });
export const placeOrder = (data) => api.post("/api/order/placeOrder", data);
export const getUserOrders = () => api.get("/api/order/userOrders");

export const listAllOrders = () => api.get("/api/order/listOrders");
export const updateOrderStatus = (orderId, status) =>
  api.post("/api/order/updateStatus", { orderId, status });

export default api;
