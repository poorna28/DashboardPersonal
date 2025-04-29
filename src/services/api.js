import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // You can modify requests here (e.g., add auth token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default {
  // User endpoints
  getUsers() {
    return api.get(config.api.endpoints.users);
  },
  getUser(id) {
    return api.get(`${config.api.endpoints.users}/${id}`);
  },
  createUser(userData) {
    return api.post(config.api.endpoints.users, userData);
  },
  updateUser(id, userData) {
    return api.put(`${config.api.endpoints.users}/${id}`, userData);
  },
  deleteUser(id) {
    return api.delete(`${config.api.endpoints.users}/${id}`);
  },
  
  // Add other API calls here as needed
};