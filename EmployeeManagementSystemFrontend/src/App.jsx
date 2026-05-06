// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminSignupPage from './pages/AdminSignupPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your pages here
import AdminDashboardPage from './pages/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<LoginPage />} /> 
        <Route path="/signup/admin" element={<AdminSignupPage />} />
        
        {/* Protected Routes with Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          {/* Admin Routes */}
          <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
          </Route>

          {/* Employee Route */}
          <Route element={<ProtectedRoute requiredRole="ROLE_EMPLOYEE" />}>
            <Route path="/dashboard/employee" element={<EmployeeDashboardPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;