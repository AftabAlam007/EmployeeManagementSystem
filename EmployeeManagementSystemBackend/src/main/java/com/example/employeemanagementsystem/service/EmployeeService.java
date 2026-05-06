package com.example.employeemanagementsystem.service;

import com.example.employeemanagementsystem.dto.AdminEmployeeResponseDTO;
import com.example.employeemanagementsystem.dto.EmployeeDto;
import com.example.employeemanagementsystem.dto.EmployeeSummaryDTO;
import com.example.employeemanagementsystem.dto.EmployeeViewDTO;
import com.example.employeemanagementsystem.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    // Entity return types for internal operations
    Employee createEmployee(EmployeeDto employeeDto);
    Employee getEmployeeById(Long id);
    List<Employee> getAllEmployees();

    // DTO return types for API responses
    EmployeeSummaryDTO getEmployeeSummaryById(Long id);
    List<EmployeeSummaryDTO> getAllEmployeeSummaries();
    AdminEmployeeResponseDTO getAdminEmployeeById(Long id);
    List<AdminEmployeeResponseDTO> getAllAdminEmployees();
    EmployeeViewDTO getEmployeeViewById(Long id);

    Employee updateEmployee(Long id, EmployeeDto employeeDto);
    AdminEmployeeResponseDTO updateEmployeeAndReturnAdminDto(Long id, EmployeeDto employeeDto);
    void deleteEmployee(Long id);
    boolean isEmployeeOwner(String username, Long employeeId);
    Employee getEmployeeByEmail(String email);
    byte[] downloadPayslip(Long employeeId, String username);
    Optional<Employee> getEmployeeByName(String name);
    Employee getHighestSalaryEmployee();
}