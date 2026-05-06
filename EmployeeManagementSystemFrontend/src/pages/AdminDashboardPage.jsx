import React, { useState, useEffect, useCallback } from 'react';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
import EmployeeList from '../components/dashboard/EmployeeList';
import EmployeeForm from '../components/dashboard/EmployeeForm';
import ViewOnlyDetails from '../components/dashboard/ViewOnlyDetails';
import AIChatbot from '../components/dashboard/AIChatbot';
import Modal from '../components/common/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminDashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleCreate = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        toast.success('Employee deleted successfully!');
        // Refresh employee list after deletion
        setEmployees(prev => prev.filter(emp => emp.id !== id));
      } catch (err) {
        setError('Failed to delete employee.');
        console.error(err);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchEmployees(); // Refresh the list after create/update
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Employee Management
        </h1>
        <button
          onClick={handleCreate}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-md"
        >
          + Add Employee
        </button>
      </div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
            <p>Loading employees...</p>
          </motion.div>
        ) : error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 text-red-500">
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmployeeList
              employees={employees}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Modal for Create/Edit */}
      <Modal isOpen={isFormOpen} onClose={handleFormClose}>
        <EmployeeForm
          employee={selectedEmployee}
          onSuccess={handleFormSuccess}
          onClose={handleFormClose}
        />
      </Modal>

      {/* View Modal for ViewOnlyDetails */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)}>
        {selectedEmployee && <ViewOnlyDetails employee={selectedEmployee} />}
      </Modal>

      <AIChatbot onActionSuccess={fetchEmployees} />
    </div>
  );
};

export default AdminDashboardPage;