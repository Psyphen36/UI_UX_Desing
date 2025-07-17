
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { DashboardLayout } from "@/components/DashboardLayout";

// Public Pages
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import MyBots from "./pages/dashboard/MyBots";
import Analytics from "./pages/dashboard/Analytics";
import Messages from "./pages/dashboard/Messages";
import UserSettings from "./pages/dashboard/UserSettings";
import Billing from "./pages/dashboard/Billing";

// Admin Pages
import AdminPanel from "./pages/AdminPanel";
import AdminUsers from "./pages/admin/Users";
import SystemStats from "./pages/admin/SystemStats";
import SystemLogs from "./pages/admin/SystemLogs";
import DevDocs from "./pages/docs";
import { useAuth } from "@/contexts/AuthContext";
import BotConfig from "./pages/dashboard/BotConfig";

const queryClient = new QueryClient();

const RequireAdminOrDev = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/dev-docs" element={<RequireAdminOrDev> <DevDocs /> </RequireAdminOrDev>} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="bots" element={<MyBots />} />
                <Route path="bot-config/:id" element={<BotConfig />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<UserSettings />} />
                <Route path="billing" element={<Billing />} />
              </Route>
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminPanel />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="stats" element={<SystemStats />} />
                <Route path="logs" element={<SystemLogs />} />
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
