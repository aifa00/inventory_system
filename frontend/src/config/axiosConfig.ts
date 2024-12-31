import axios from "axios";

// configure base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL as string,
});

// configure request interceptor to add token on each request header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
