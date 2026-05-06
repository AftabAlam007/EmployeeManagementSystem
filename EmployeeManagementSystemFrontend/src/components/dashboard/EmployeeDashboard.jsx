// src/components/dashboard/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getEmployeeByEmail, downloadPayslip } from '../../services/employeeService';
import { useAuth } from '../../context/AuthContext';
import ViewOnlyDetails from './ViewOnlyDetails';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!currentUser?.email) {
        setIsLoading(false);
        setError("Could not identify user.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await getEmployeeByEmail(currentUser.email);

        // 🔥 UPDATED: Backend now returns EmployeeViewDTO directly (no unwrapping needed)
        setEmployee(response);
        setError(null);
      } catch (err) {
        setError('Failed to fetch your details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [currentUser]);

  const handleDownloadPayslip = async () => {
    if (!employee) return;

    // 🔥 MAIN FIX 2: Securely grab ID with fallback checks
    const empId = employee.id || employee._id || employee.employeeId || employee.employmentCode;

    if (!empId) {
        setError("Employee ID missing, cannot download payslip.");
        return;
    }

    try {
      const blob = await downloadPayslip(empId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip_${empId}_${new Date().toISOString().slice(0, 7)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download payslip.');
      console.error("Download Error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <AnimatePresence>
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
            <p>Loading your details...</p>
          </motion.div>
        ) : error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 text-red-500">
            <p>{error}</p>
          </motion.div>
        ) : employee ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">
                    My Dashboard
                </h1>
                <button
                    onClick={handleDownloadPayslip}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-transform hover:scale-105 shadow-md"
                >
                    Download Payslip
                </button>
            </div>
            {/* ViewOnlyDetails ab exact data receive karega */}
            <ViewOnlyDetails employee={employee} />
          </motion.div>
        ) : (
            <div className="text-center py-10">No employee details found.</div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeDashboard;