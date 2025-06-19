// api/axiosInstance.js
import axios from 'axios';
import { store } from '../app/store';

const axiosInstance = axios.create(); // بدون baseURL

axiosInstance.interceptors.request.use(
  (config) => {
    const lang = store.getState().language.language;
    config.headers['Accept-Language'] = lang;
    config.withCredentials = true; 
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;