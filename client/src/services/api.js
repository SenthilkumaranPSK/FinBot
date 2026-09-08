import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Uses Vercel env variable in production, fallback to localhost for dev
  headers: {
    'Content-Type': 'application/json'
  }
});

// We are mocking authentication on the backend, so we don't strictly need interceptors for JWT right now
// But we keep it here just in case we need it later
api.interceptors.request.use(
  (config) => {
    // You could inject a token here if you were using full auth
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
