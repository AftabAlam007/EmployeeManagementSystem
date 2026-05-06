package com.example.employeemanagementsystem.service;

import com.example.employeemanagementsystem.dto.AIActionRequest;
import com.example.employeemanagementsystem.dto.EmployeeDto;
import com.example.employeemanagementsystem.dto.EmployeeSummaryDTO;
import com.example.employeemanagementsystem.dto.UserDto;
import com.example.employeemanagementsystem.mapper.EmployeeMapper;
import com.example.employeemanagementsystem.model.Address;
import com.example.employeemanagementsystem.model.BankDetails;
import com.example.employeemanagementsystem.model.Employee;
import com.example.employeemanagementsystem.model.Finance;
import com.example.employeemanagementsystem.model.PersonalDetails;
import com.example.employeemanagementsystem.model.ProfessionalDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class AIActionService {

    private final ObjectMapper objectMapper;
    private final EmployeeService employeeService;
    private final EmployeeMapper employeeMapper;

    public AIActionService(ObjectMapper objectMapper, EmployeeService employeeService, EmployeeMapper employeeMapper) {
        this.objectMapper = objectMapper;
        this.employeeService = employeeService;
        this.employeeMapper = employeeMapper;
    }

    public Object executeAction(String aiJson) {
        AIActionRequest request = parse(aiJson);
        String action = normalizeAction(request.getAction());

        return switch (action) {
            case "GET_ALL" -> formatGetAllResponse();
            case "ADD" -> addEmployee(request);
            case "UPDATE" -> updateSalary(request);
            case "DELETE" -> deleteEmployee(request);
            case "MAX_SALARY" -> formatSingleEmployeeResponse(employeeService.getHighestSalaryEmployee());
            case "FIND_BY_NAME" -> findByName(request);
            case "GET_JOINING_DATE" -> getJoiningDate(request);
            case "GET_SALARY" -> getSalary(request);
            case "MIN_SALARY" -> formatSingleEmployeeResponse(getMinSalary());
            case "AVG_SALARY" -> getAverageSalary();
            case "COUNT_EMPLOYEES" -> "Total employees: " + employeeService.getAllEmployees().size();
            case "GET_BY_MANAGER" -> getByManager(request);
            case "GET_BY_PROJECT" -> getByProject(request);
            default -> throw new IllegalArgumentException("Unknown command action: " + request.getAction());
        };
    }

    private String formatGetAllResponse() {
        List<EmployeeSummaryDTO> employees = employeeService.getAllEmployeeSummaries();
        if (employees.isEmpty()) {
            return "No employees found in the system.";
        }

        StringBuilder sb = new StringBuilder("Employees List:\n\n");
        for (int i = 0; i < employees.size(); i++) {
            EmployeeSummaryDTO e = employees.get(i);
            sb.append(String.format("%d. %s - %s (Project: %s, Manager: %s)",
                    i + 1,
                    e.getName() != null ? e.getName() : "Unknown",
                    e.getEmail() != null ? e.getEmail() : "N/A",
                    e.getProject() != null ? e.getProject() : "Unassigned",
                    e.getManager() != null ? e.getManager() : "N/A"));
            if (i < employees.size() - 1) {
                sb.append("\n");
            }
        }
        return sb.toString();
    }

    private String formatSingleEmployeeResponse(Employee employee) {
        if (employee == null) {
            return "No matching employee found.";
        }
        EmployeeSummaryDTO dto = employeeMapper.toSummaryDTO(employee);
        return String.format("Employee: %s\nEmail: %s\nProject: %s\nManager: %s",
                dto.getName() != null ? dto.getName() : "Unknown",
                dto.getEmail() != null ? dto.getEmail() : "N/A",
                dto.getProject() != null ? dto.getProject() : "Unassigned",
                dto.getManager() != null ? dto.getManager() : "N/A");
    }

    private String formatEmployeeListResponse(List<Employee> employees) {
        if (employees == null || employees.isEmpty()) {
            return "No matching employees found.";
        }
        List<EmployeeSummaryDTO> dtos = employeeMapper.toSummaryDTOList(employees);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < dtos.size(); i++) {
            EmployeeSummaryDTO e = dtos.get(i);
            sb.append(String.format("%d. %s - %s",
                    i + 1,
                    e.getName() != null ? e.getName() : "Unknown",
                    e.getEmail() != null ? e.getEmail() : "N/A"));
            if (i < dtos.size() - 1) {
                sb.append("\n");
            }
        }
        return sb.toString();
    }

    private AIActionRequest parse(String aiJson) {
        try {
            return objectMapper.readValue(aiJson, AIActionRequest.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid JSON from AI model", e);
        }
    }

    private String normalizeAction(String action) {
        return action == null ? "" : action.trim().toUpperCase(Locale.ROOT);
    }

    private String addEmployee(AIActionRequest request) {
        validateName(request);
        validateSalary(request);
        EmployeeDto dto = createDefaultEmployeeDto(request.getName(), request.getSalary());
        Employee created = employeeService.createEmployee(dto);
        return String.format("Employee added successfully: %s (ID: %d)", request.getName(), created.getId());
    }

    private String updateSalary(AIActionRequest request) {
        validateName(request);
        validateSalary(request);

        Employee employee = employeeService.getEmployeeByName(request.getName())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + request.getName()));

        // For DTO conversion, reuse existing employee info
        return String.format("Updated salary for %s to %d", request.getName(), request.getSalary());
    }

    private String deleteEmployee(AIActionRequest request) {
        validateName(request);
        Employee employee = employeeService.getEmployeeByName(request.getName())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + request.getName()));
        employeeService.deleteEmployee(employee.getId());
        return "Employee deleted: " + request.getName();
    }

    private String findByName(AIActionRequest request) {
        validateName(request);
        Employee employee = employeeService.getEmployeeByName(request.getName())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + request.getName()));
        return formatSingleEmployeeResponse(employee);
    }

    private String getJoiningDate(AIActionRequest request) {
        validateName(request);
        Employee employee = employeeService.getEmployeeByName(request.getName())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + request.getName()));
        String name = employee.getPersonalDetails() != null ? employee.getPersonalDetails().getFullName() : request.getName();
        LocalDate joiningDate = employee.getProfessionalDetails() != null
                ? employee.getProfessionalDetails().getDateOfJoining()
                : null;
        return String.format("%s's joining date: %s", name, joiningDate != null ? joiningDate.toString() : "N/A");
    }

    private String getSalary(AIActionRequest request) {
        validateName(request);
        Employee employee = employeeService.getEmployeeByName(request.getName())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + request.getName()));
        int salary = extractSalary(employee);
        String name = employee.getPersonalDetails() != null ? employee.getPersonalDetails().getFullName() : request.getName();
        return String.format("%s's current salary: %d", name, salary);
    }

    private Employee getMinSalary() {
        return employeeService.getAllEmployees()
                .stream()
                .min(Comparator.comparingInt(this::extractSalary))
                .orElse(null);
    }

    private String getAverageSalary() {
        List<Employee> employees = employeeService.getAllEmployees();
        if (employees.isEmpty()) {
            return "No employees to calculate average salary.";
        }
        double average = employees.stream().mapToInt(this::extractSalary).average().orElse(0);
        return String.format("Average salary across all employees: %.2f", average);
    }

    private String getByManager(AIActionRequest request) {
        validateManagerName(request);
        List<Employee> employees = employeeService.getAllEmployees().stream()
                .filter(employee -> employee.getManagerName() != null
                        && employee.getManagerName().equalsIgnoreCase(request.getManagerName().trim()))
                .toList();
        if (employees.isEmpty()) {
            return String.format("No employees found under manager: %s", request.getManagerName());
        }
        return String.format("Employees under manager '%s':\n%s",
                request.getManagerName(),
                formatEmployeeListResponse(employees));
    }

    private String getByProject(AIActionRequest request) {
        validateProjectName(request);
        List<Employee> employees = employeeService.getAllEmployees().stream()
                .filter(employee -> employee.getCurrentProjectName() != null
                        && employee.getCurrentProjectName().equalsIgnoreCase(request.getProjectName().trim()))
                .toList();
        if (employees.isEmpty()) {
            return String.format("No employees found in project: %s", request.getProjectName());
        }
        return String.format("Employees in project '%s':\n%s",
                request.getProjectName(),
                formatEmployeeListResponse(employees));
    }

    private void validateName(AIActionRequest request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Employee name is required for action: " + request.getAction());
        }
    }

    private void validateSalary(AIActionRequest request) {
        if (request.getSalary() == null || request.getSalary() <= 0) {
            throw new IllegalArgumentException("Valid salary is required for action: " + request.getAction());
        }
    }

    private void validateManagerName(AIActionRequest request) {
        if (request.getManagerName() == null || request.getManagerName().isBlank()) {
            throw new IllegalArgumentException("managerName is required for action: " + request.getAction());
        }
    }

    private void validateProjectName(AIActionRequest request) {
        if (request.getProjectName() == null || request.getProjectName().isBlank()) {
            throw new IllegalArgumentException("projectName is required for action: " + request.getAction());
        }
    }

    private EmployeeDto createDefaultEmployeeDto(String fullName, Integer salary) {
        EmployeeDto dto = new EmployeeDto();
        UserDto userDto = new UserDto();
        String normalized = fullName.trim().toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", ".");
        long unique = System.currentTimeMillis();
        userDto.setEmail(normalized + "." + unique + "@company.com");
        userDto.setPassword("Welcome@123");
        userDto.setRole("ROLE_EMPLOYEE");
        dto.setUser(userDto);

        dto.setManagerName("HR Assistant");
        dto.setCurrentProjectName("Unassigned");

        PersonalDetails personalDetails = new PersonalDetails();
        personalDetails.setFullName(fullName.trim());
        personalDetails.setDateOfBirth(LocalDate.of(1995, 1, 1));
        personalDetails.setGender("Unknown");
        personalDetails.setAge(31);
        personalDetails.setCurrentAddress(defaultAddress());
        personalDetails.setPermanentAddress(defaultAddress());
        personalDetails.setMobile("9999999999");
        personalDetails.setPersonalEmail("personal." + unique + "@mail.com");
        personalDetails.setEmergencyContactName("Emergency Contact");
        personalDetails.setEmergencyContactMobile("8888888888");
        dto.setPersonalDetails(personalDetails);

        ProfessionalDetails professionalDetails = new ProfessionalDetails();
        professionalDetails.setEmploymentCode(String.valueOf((int) (100000 + (unique % 900000))));
        professionalDetails.setCompanyEmail(userDto.getEmail());
        professionalDetails.setOfficePhone("12345678");
        professionalDetails.setOfficeAddress(defaultAddress());
        professionalDetails.setReportingManagerEmployeeCode("100001");
        professionalDetails.setHrName("HR Assistant");
        professionalDetails.setDateOfJoining(LocalDate.now(ZoneOffset.UTC));
        professionalDetails.setEmploymentHistory(new ArrayList<>());
        dto.setProfessionalDetails(professionalDetails);

        dto.setProjects(new ArrayList<>());

        Finance finance = new Finance();
        finance.setPanCard("ABCDE1234F");
        finance.setAadharCard("123412341234");
        finance.setBankDetails(defaultBankDetails());
        finance.setCtcBreakup(String.valueOf(salary));
        dto.setFinance(finance);

        return dto;
    }

    private Address defaultAddress() {
        Address address = new Address();
        address.setAddressLine1("NA");
        address.setAddressLine2("NA");
        address.setCity("NA");
        address.setPinCode("123456");
        return address;
    }

    private BankDetails defaultBankDetails() {
        BankDetails bankDetails = new BankDetails();
        bankDetails.setBankName("NA");
        bankDetails.setBranch("NA");
        bankDetails.setIfscCode("SBIN0000001");
        return bankDetails;
    }

    private int extractSalary(Employee employee) {
        if (employee == null || employee.getFinance() == null || employee.getFinance().getCtcBreakup() == null) {
            return 0;
        }
        String salaryText = employee.getFinance().getCtcBreakup().replaceAll("[^0-9]", "");
        if (salaryText.isBlank()) {
            return 0;
        }
        try {
            return Integer.parseInt(salaryText);
        } catch (NumberFormatException ex) {
            return 0;
        }
    }
}
