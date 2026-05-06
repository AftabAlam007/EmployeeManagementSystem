package com.example.employeemanagementsystem.repository;

import com.example.employeemanagementsystem.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUserEmail(String email);
    Optional<Employee> findFirstByPersonalDetailsFullNameIgnoreCase(String fullName);
    List<Employee> findByManagerNameIgnoreCase(String managerName);
    List<Employee> findByCurrentProjectNameIgnoreCase(String currentProjectName);
}
