import axios from "axios";
import { toast } from "@/hooks/use-toast";

// create the instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
});

// 👉 Add this interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast({
        title: "Session expired",
        description: "Please log in again.",
        variant: "destructive",
      });

      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
