import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// this block of code is executed before every request is sent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("shoplix_token");
  if (token) {
    // Your backend middleware reads req.headers.token (not Authorization: Bearer)
    config.headers.token = token;
  }
  return config;
});

// User API ->
export const registerUser = (data) => {
  return api.post("/api/user/register", data);
};

export const loginUser = (data) => {
  return api.post("/api/user/login", data);
};

export default api;

// // ─── User API ───────────────────────────────────────
// export const userAPI = {
//   register: (data) => api.post('/api/user/register', data),
//   login: (data) => api.post('/api/user/login', data),
// }

// // ─── Product API ─────────────────────────────────────
// export const productAPI = {
//   list: (params) => api.get('/api/product/list', { params }),
//   getOne: (productId) => api.get(`/api/product/listOne/${productId}`),
//   add: (data) => api.post('/api/product/add', data, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   }),
//   delete: (data) => api.post('/api/product/delete', data),
// }

// // ─── Cart API ────────────────────────────────────────
// export const cartAPI = {
//   get: () => api.get('/api/cart/get'),
//   add: (data) => api.post('/api/cart/add', data),
//   update: (data) => api.post('/api/cart/update', data),
//   remove: (data) => api.post('/api/cart/remove', data),
// }

// // ─── Order API ───────────────────────────────────────
// export const orderAPI = {
//   place: (data) => api.post('/api/order/placeOrder', data),
//   userOrders: () => api.get('/api/order/userOrders'),
//   listAll: () => api.get('/api/order/listOrders'),
//   updateStatus: (data) => api.post('/api/order/updateStatus', data),
// }
