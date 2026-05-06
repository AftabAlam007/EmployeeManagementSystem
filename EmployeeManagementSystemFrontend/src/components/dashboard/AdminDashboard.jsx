// src/components/dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import Modal from '../common/Modal';
import ViewOnlyDetails from './ViewOnlyDetails';
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} from '../../services/employeeService';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
    data: null,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployees();
      // Agar list me bhi wrapper aa raha hai toh usko handle karne ke liye safety
      const dataList = response?.data ? response.data : response;
      setEmployees(dataList);
    } catch (err) {
      setError('Failed to fetch employees.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setModalState({ isOpen: true, mode: 'add', data: null });
  };

  const handleOpenEditModal = (employee) => {
    setModalState({ isOpen: true, mode: 'edit', data: employee });
  };

  // ✅ UPDATED: Use new EmployeeViewDTO for both admin and employee views
    const handleOpenViewModal = async (employee) => {
    // 1. Pehle list wale employee ko print karte hain taaki ID ka naam pata chale
    console.log("👉 LIST SE AAYA EMPLOYEE:", employee);

    // 2. ID nikalne ka try karte hain (kabhi id hota hai, kabhi _id, kabhi employeeId)
    const empId = employee.id || employee._id || employee.employeeId || employee.employmentCode;

    try {
      // Use the new view endpoint that returns full nested data
      const response = await getEmployeeById(empId);
      const fullEmployee = response.data ? response.data : response;

      console.log("👉 BACKEND SE AAYA FULL DATA:", fullEmployee);

      setModalState({
        isOpen: true,
        mode: 'view',
        data: fullEmployee
      });
    } catch (err) {
      // 🔥 AGAR API FAIL HUI TOH SCREEN PAR POPUP AAYEGA 🔥
      alert("Error: Full Details fetch nahi ho paayi! Sayad getEmployeeById API fail ho rahi hai.");
      console.error("Details fetch karne mein error aayi hai:", err);

      setModalState({
        isOpen: true,
        mode: 'view',
        data: employee
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: null, data: null });
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        setError('Failed to delete employee.');
        console.error(err);
      }
    }
  };

  const handleSaveEmployee = () => {
    fetchEmployees();
    handleCloseModal();
  };

  const getModalTitle = () => {
    if (modalState.mode === 'add') return 'Add New Employee';
    if (modalState.mode === 'edit') return 'Edit Employee';
    if (modalState.mode === 'view' && modalState.data) {
        const name = modalState.data.personalDetails?.fullName || modalState.data.fullName || modalState.data.name;
        return name ? `Viewing ${name}` : 'View Employee Details';
    }
    return '';
  };

  if (loading) {
    return <div className="text-center py-8">Loading employees...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Employee List</h2>
        <button
          onClick={handleOpenAddModal}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Employee
        </button>
      </div>

      <EmployeeList
        employees={employees}
        onView={handleOpenViewModal}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteEmployee}
      />

      <Modal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
        size={modalState.mode === 'view' ? 'max-w-4xl' : 'max-w-6xl'}
      >
        {(modalState.mode === 'add' || modalState.mode === 'edit') && (
          <EmployeeForm
            employeeToEdit={modalState.data}
            onSave={handleSaveEmployee}
            onCancel={handleCloseModal}
          />
        )}
        {modalState.mode === 'view' && modalState.data && (
          <ViewOnlyDetails employee={modalState.data} />
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;