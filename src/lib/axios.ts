import axios, { AxiosRequestConfig, AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/auth",
  withCredentials: true,
  headers: {
    "x-client-type": "web",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
const axiosTrend = axios.create({
  baseURL: "http://localhost:5001/api/trends",
  withCredentials: false,
  headers: {
    "x-client-type": "web",
    "Content-Type": "application/json",
  },
});

axiosTrend.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
export { axiosInstance, axiosTrend };
