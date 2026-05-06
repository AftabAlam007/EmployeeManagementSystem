// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();

  // 1. Wait for the auth state to be determined
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // 2. Once loading is false, then check for authentication
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login/employee" replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    // If authenticated but role does not match, redirect to a 'not authorized' page or home
    // For simplicity, we'll redirect them to their own dashboard or home
    const homePath = currentUser.role === 'ROLE_ADMIN' ? '/dashboard/admin' : '/dashboard/employee';
    return <Navigate to={homePath} replace />;
  }

  // If authenticated and has the correct role (or no role is required), render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
