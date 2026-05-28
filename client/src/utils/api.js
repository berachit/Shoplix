import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('shoplix_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── User API ───────────────────────────────────────
export const userAPI = {
  register: (data) => api.post('/api/user/register', data),
  login: (data) => api.post('/api/user/login', data),
}

// ─── Product API ─────────────────────────────────────
export const productAPI = {
  list: (params) => api.get('/api/product/list', { params }),
  getOne: (productId) => api.get(`/api/product/listOne/${productId}`),
  add: (data) => api.post('/api/product/add', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (data) => api.post('/api/product/delete', data),
}

// ─── Cart API ────────────────────────────────────────
export const cartAPI = {
  get: () => api.get('/api/cart/get'),
  add: (data) => api.post('/api/cart/add', data),
  update: (data) => api.post('/api/cart/update', data),
  remove: (data) => api.post('/api/cart/remove', data),
}

// ─── Order API ───────────────────────────────────────
export const orderAPI = {
  place: (data) => api.post('/api/order/placeOrder', data),
  userOrders: () => api.get('/api/order/userOrders'),
  listAll: () => api.get('/api/order/listOrders'),
  updateStatus: (data) => api.post('/api/order/updateStatus', data),
}

export default api
