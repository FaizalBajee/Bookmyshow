import axios from "axios";
import { AuthContext } from "../../Component/auth/authContext/AuthContext";
import { useContext } from "react";

const authData = useContext(AuthContext);

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = `Bearer ${authData?.token}`;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      //need to set refresh token
      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data || { message: "Server error" });
  }
);

export default api;
