// src/components/layout/DashboardHeader.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const DashboardHeader = () => {
  const { currentUser, logout } = useAuth();

  const dashboardTitle =
    currentUser?.role === 'ROLE_ADMIN'
      ? 'Admin Dashboard'
      : currentUser?.role === 'ROLE_EMPLOYEE'
      ? 'Employee Dashboard'
      : 'Dashboard';

  return (
    <motion.header
      className="bg-white shadow-sm p-4 flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-slate-800">{dashboardTitle}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-slate-600 font-medium hidden sm:inline">
          Welcome, {currentUser?.email}!
        </span>
        <button
          onClick={logout}
          className="bg-purple-100 text-purple-700 px-5 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;