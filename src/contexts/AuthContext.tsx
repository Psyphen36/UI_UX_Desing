import api from "@/api/axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
const API_URL = import.meta.env.VITE_API_URL || '';

interface User {
  username: string;
  id: string;
  email: string;
  role: 'user' | 'admin';
  name: string;
  subscription_status?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const fetchCsrfToken = async () => {
  await api.get("/api/csrf", { withCredentials: true });
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  isAdmin: () => false,

});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 🆕 loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }

    const isFrontendOnlyMode = import.meta.env.VITE_FAKE_AUTH === "true";

    if (!isFrontendOnlyMode) {
      fetchCsrfToken()
        .catch(() => console.warn("Could not fetch CSRF token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);


  const login = async (email: string, password: string) => {
    const isFrontendOnlyMode = import.meta.env.VITE_FAKE_AUTH === "true";
      if (isFrontendOnlyMode) return;
    try {
      await fetchCsrfToken();

      const res = await api.post("/api/login", {
        username: email,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": Cookies.get("csrf_token") || "",
        },
        withCredentials: true,
      });

      const data = res.data;

      const userData: User = {
        id: data.user.id,
        email: data.user.username,
        name: data.user.username.split("@")[0],
        role: data.user.username.includes("admin") ? "admin" : "user",
        username: data.user.username,
        subscription_status: data.user.subscription_status,
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));

      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });

    } catch (error: any) {
      logout();

      console.error("AuthContext login error:", error);
      console.error("Full Axios response data:", error?.response?.data);

      let description = "Login failed.";

      const detail = error?.response?.data?.detail;

      if (Array.isArray(detail)) {
        description = detail
          .map((e: any) => `${e.loc?.join('.')}: ${e.msg}`)
          .join(", ");
      } else if (typeof detail === "string") {
        description = detail;
      } else if (error?.message) {
        description = error.message;
      }
    }
  };


  const signup = async (name: string, email: string, password: string) => {
    const isFrontendOnlyMode = import.meta.env.VITE_FAKE_AUTH === "true";
      if (isFrontendOnlyMode) return;

    try {
      await fetchCsrfToken();

      await api.post("/api/signup", {
        username: email,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": Cookies.get("csrf_token") || "",
        },
        withCredentials: true
      });

      await login(email, password);

    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      const description = Array.isArray(detail)
        ? detail.join(", ")
        : detail || "Signup failed";

      toast({
        title: "Signup Failed",
        description,
        variant: "destructive",
      });

      throw new Error(description);
    }
  };


  const logout = async () => {
    try {
      await api.post("/api/logout"); // 👈 backend should support this route
    } catch (e) {
      console.warn("Logout API call failed", e);
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };


  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, login, signup, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
