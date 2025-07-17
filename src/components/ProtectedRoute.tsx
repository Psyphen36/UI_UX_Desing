import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BotSkeletonLoader from '@/components/BotSkeletonLoader'; // or your own loader

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // While checking localStorage or fetching session, delay render
  if (loading) {
    return <BotSkeletonLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
