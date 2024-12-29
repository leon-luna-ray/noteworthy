import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '/api/v1';

axios.defaults.baseURL = BASE_API_URL ;

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;