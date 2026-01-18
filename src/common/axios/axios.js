import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //  Attempt refresh
        await api.post("/auth/refresh-token");

        // retry original request
        return api(originalRequest);
      } catch (refreshError) {
        setAuthToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response?.data || { message: "Server error" });
  }
);

export default api;
