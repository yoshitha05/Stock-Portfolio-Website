// frontend/src/api/axiosClient.ts
import axios from "axios";

// Use Vite environment variable for backend base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE + "/api", // <-- adds /api automatically
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
