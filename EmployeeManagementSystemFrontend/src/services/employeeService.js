// src/services/employeeService.js
import apiClient from '../api/apiClient';

export const createEmployee = async (employeeData) => {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
};

export const getAllEmployees = async () => {
    const response = await apiClient.get('/employees');
    console.log('=== GET EMPLOYEES RESPONSE ===', response.data);
    return Array.isArray(response.data) ? response.data : (response.data?.data || []);
};

export const getEmployeeById = async (id) => {
    const response = await apiClient.get(`/employees/${id}`);
    // 🔥 UPDATED: Backend now returns EmployeeViewDTO for non-admin users
    return response.data?.data || response.data;
};

export const getEmployeeByEmail = async (email) => {
    const response = await apiClient.get(`/employees/by-email?email=${email}`);
    // 🔥 UPDATED: Backend now returns EmployeeViewDTO directly (no unwrapping needed)
    return response.data?.data || response.data;
};

export const updateEmployee = async (id, employeeData) => {
    const response = await apiClient.put(`/employees/${id}`, employeeData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
};

export const downloadPayslip = async (id) => {
    const response = await apiClient.get(`/employees/${id}/payslip`, {
        responseType: 'blob',
    });
    return response.data;
};