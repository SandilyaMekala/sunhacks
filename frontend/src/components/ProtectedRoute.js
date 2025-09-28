import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  const location = useLocation();

  // Debug logging
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'userType:', userType, 'requireAdmin:', requireAdmin);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#4a5568'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    // Redirect to appropriate login page
    const loginPath = requireAdmin ? '/login/admin' : '/login/employee';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (requireAdmin && userType !== 'admin') {
    console.log('Admin required but user is not admin, redirecting to admin login');
    // If admin access is required but user is not admin, redirect to admin login
    return <Navigate to="/login/admin" state={{ from: location }} replace />;
  }

  if (!requireAdmin && userType === 'admin') {
    console.log('User is admin but trying to access employee route, redirecting to admin dashboard');
    // If employee route but user is admin, redirect to admin dashboard
    return <Navigate to="/admin" replace />;
  }

  console.log('Access granted, rendering children');
  return children;
};

export default ProtectedRoute;