import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para incluir token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para capturar 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('Token inválido ou expirado, redirecionando...');
      localStorage.removeItem('token');
      window.location.href = '/login'; // ou window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
