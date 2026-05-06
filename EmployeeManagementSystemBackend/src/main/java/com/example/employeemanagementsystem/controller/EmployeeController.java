package com.example.employeemanagementsystem.controller;

import com.example.employeemanagementsystem.dto.ApiResponse;
import com.example.employeemanagementsystem.dto.EmployeeDto;
import com.example.employeemanagementsystem.dto.EmployeeSummaryDTO;
import com.example.employeemanagementsystem.dto.AdminEmployeeResponseDTO;
import com.example.employeemanagementsystem.dto.EmployeeViewDTO;
import com.example.employeemanagementsystem.model.Employee;
import com.example.employeemanagementsystem.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<ApiResponse<AdminEmployeeResponseDTO>> createEmployee(@Valid @RequestBody EmployeeDto employeeDto) {
        Employee createdEmployee = employeeService.createEmployee(employeeDto);
        AdminEmployeeResponseDTO responseDto = employeeService.getAdminEmployeeById(createdEmployee.getId());
        return new ResponseEntity<>(ApiResponse.success("Employee created successfully", responseDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getEmployeeById(@PathVariable Long id, Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            AdminEmployeeResponseDTO employee = employeeService.getAdminEmployeeById(id);
            if (employee != null) {
                return new ResponseEntity<>(ApiResponse.success(employee), HttpStatus.OK);
            }
            return new ResponseEntity<>(ApiResponse.error("Employee not found"), HttpStatus.NOT_FOUND);
        } else {
            EmployeeViewDTO employee = employeeService.getEmployeeViewById(id);
            if (employee != null) {
                return new ResponseEntity<>(ApiResponse.success(employee), HttpStatus.OK);
            }
            return new ResponseEntity<>(ApiResponse.error("Employee not found"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllEmployees(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            List<AdminEmployeeResponseDTO> employees = employeeService.getAllAdminEmployees();
            return new ResponseEntity<>(ApiResponse.success(employees), HttpStatus.OK);
        } else {
            List<EmployeeSummaryDTO> employees = employeeService.getAllEmployeeSummaries();
            return new ResponseEntity<>(ApiResponse.success(employees), HttpStatus.OK);
        }
    }

    @GetMapping("/by-email")
    public ResponseEntity<ApiResponse<EmployeeViewDTO>> getEmployeeByEmail(@RequestParam String email) {
        Employee employee = employeeService.getEmployeeByEmail(email);
        if (employee != null) {
            EmployeeViewDTO viewDto = employeeService.getEmployeeViewById(employee.getId());
            return new ResponseEntity<>(ApiResponse.success(viewDto), HttpStatus.OK);
        }
        return new ResponseEntity<>(ApiResponse.error("Employee not found"), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminEmployeeResponseDTO>> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDto employeeDto) {
        AdminEmployeeResponseDTO updatedEmployee = employeeService.updateEmployeeAndReturnAdminDto(id, employeeDto);
        if (updatedEmployee != null) {
            return new ResponseEntity<>(ApiResponse.success("Employee updated successfully", updatedEmployee), HttpStatus.OK);
        }
        return new ResponseEntity<>(ApiResponse.error("Employee not found"), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(ApiResponse.success("Employee deleted successfully", null), HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}/payslip")
    public ResponseEntity<byte[]> downloadPayslip(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean isOwner = employeeService.isEmployeeOwner(username, id);
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !isOwner) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        byte[] payslip = employeeService.downloadPayslip(id, username);
        if (payslip != null) {
            MediaType pdfMediaType = org.springframework.http.MediaType.APPLICATION_PDF;
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"payslip_" + id + ".pdf\"")
                    .contentType(pdfMediaType)
                    .body(payslip);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}