
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Array<"admin" | "tutor" | "student">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, userRole } = useUser();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    // User is authenticated but doesn't have the right role
    // Redirect to their appropriate dashboard
    if (userRole === 'admin') {
      return <Navigate to="/users" replace />;
    } else if (userRole === 'tutor') {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  // User is authenticated and has the right role
  return <>{children}</>;
};

export default ProtectedRoute;
