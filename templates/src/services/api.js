import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for auth if needed
api.interceptors.request.use(
  (config) => {
    // Add auth headers if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const bookAPI = {
  // GET /api/books?page=1&limit=20&q=...&filters=...
  getBooks: (params = {}) => api.get('/books', { params }),

  // GET /api/book/:id
  getBook: (id) => api.get(`/book/${id}`),

  // POST /api/recommend
  getRecommendations: (data) => api.post('/recommend', data),
};

export default api;