// src/components/layout/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }} // Start off-screen
        animate={{ x: 0 }}     // Animate to position 0
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <Sidebar />
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard-specific Header */}
        <DashboardHeader />

        {/* Main Content (Page) */}
        <motion.main
          className="flex-1 overflow-x-hidden overflow-y-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Outlet /> {/* This is where your pages will render */}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;