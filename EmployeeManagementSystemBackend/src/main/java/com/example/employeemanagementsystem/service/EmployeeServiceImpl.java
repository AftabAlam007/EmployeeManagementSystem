package com.example.employeemanagementsystem.service;

import com.example.employeemanagementsystem.dto.AdminEmployeeResponseDTO;
import com.example.employeemanagementsystem.dto.EmployeeDto;
import com.example.employeemanagementsystem.dto.EmployeeSummaryDTO;
import com.example.employeemanagementsystem.dto.EmployeeViewDTO;
import com.example.employeemanagementsystem.mapper.EmployeeMapper;
import com.example.employeemanagementsystem.model.Address;
import com.example.employeemanagementsystem.model.BankDetails;
import com.example.employeemanagementsystem.model.Employee;
import com.example.employeemanagementsystem.model.EmploymentHistory;
import com.example.employeemanagementsystem.model.Finance;
import com.example.employeemanagementsystem.model.PersonalDetails;
import com.example.employeemanagementsystem.model.ProfessionalDetails;
import com.example.employeemanagementsystem.model.Project;
import com.example.employeemanagementsystem.model.User;
import com.example.employeemanagementsystem.repository.EmployeeRepository;
import com.example.employeemanagementsystem.repository.UserRepository;
import com.example.employeemanagementsystem.util.MaskingUtils;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmployeeMapper employeeMapper;
    private final MaskingUtils maskingUtils;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, UserRepository userRepository,
                                BCryptPasswordEncoder passwordEncoder, EmployeeMapper employeeMapper,
                                MaskingUtils maskingUtils) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.employeeMapper = employeeMapper;
        this.maskingUtils = maskingUtils;
    }

    private void validateDates(List<EmploymentHistory> employmentHistoryList, List<Project> projectList) {
        if (employmentHistoryList != null) {
            for (EmploymentHistory history : employmentHistoryList) {
                if (history.getJoiningDate() != null && history.getEndDate() != null &&
                        history.getEndDate().isBefore(history.getJoiningDate())) {
                    throw new IllegalArgumentException("Employment history end date cannot be before joining date.");
                }
            }
        }
        if (projectList != null) {
            for (Project project : projectList) {
                if (project.getStartDate() != null && project.getEndDate() != null &&
                        project.getEndDate().isBefore(project.getStartDate())) {
                    throw new IllegalArgumentException("Project end date cannot be before start date.");
                }
            }
        }
    }

    @Override
    public Employee createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();

        if (employeeDto.getUser() != null) {
            User user = userRepository.findByEmail(employeeDto.getUser().getEmail()).orElse(null);
            if (user == null) {
                user = new User();
                user.setEmail(employeeDto.getUser().getEmail());
                user.setPassword(passwordEncoder.encode(employeeDto.getUser().getPassword()));
                user.setRole(employeeDto.getUser().getRole());
                user = userRepository.save(user);
            }
            employee.setUser(user);
        }

        employee.setManagerName(employeeDto.getManagerName());
        employee.setCurrentProjectName(employeeDto.getCurrentProjectName());

        if (employeeDto.getPersonalDetails() != null) {
            employee.setPersonalDetails(employeeDto.getPersonalDetails());
        }

        if (employeeDto.getProfessionalDetails() != null) {
            employee.setProfessionalDetails(employeeDto.getProfessionalDetails());
        }

        if (employeeDto.getProjects() != null && !employeeDto.getProjects().isEmpty()) {
            employee.setProjects(employeeDto.getProjects());
        }

        if (employeeDto.getFinance() != null) {
            employee.setFinance(employeeDto.getFinance());
        }

        validateDates(
                employeeDto.getProfessionalDetails() != null ?
                        employeeDto.getProfessionalDetails().getEmploymentHistory() : Collections.emptyList(),
                employeeDto.getProjects()
        );

        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        if (id == null) {
            return null;
        }
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public EmployeeSummaryDTO getEmployeeSummaryById(Long id) {
        Employee employee = getEmployeeById(id);
        return employeeMapper.toSummaryDTO(employee);
    }

    @Override
    public List<EmployeeSummaryDTO> getAllEmployeeSummaries() {
        List<Employee> employees = getAllEmployees();
        return employeeMapper.toSummaryDTOList(employees);
    }

    @Override
    public AdminEmployeeResponseDTO getAdminEmployeeById(Long id) {
        Employee employee = getEmployeeById(id);
        return employeeMapper.toAdminDTO(employee);
    }

    @Override
    public List<AdminEmployeeResponseDTO> getAllAdminEmployees() {
        List<Employee> employees = getAllEmployees();
        return employeeMapper.toAdminDTOList(employees);
    }

    @Override
    public EmployeeViewDTO getEmployeeViewById(Long id) {
        Employee employee = getEmployeeById(id);
        return employeeMapper.toViewDTO(employee);
    }

    @Override
    public Employee updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if (existingEmployee != null) {
            updateEmployeeFields(existingEmployee, employeeDto);
            return employeeRepository.save(existingEmployee);
        }
        return null;
    }

    @Override
    public AdminEmployeeResponseDTO updateEmployeeAndReturnAdminDto(Long id, EmployeeDto employeeDto) {
        Employee updated = updateEmployee(id, employeeDto);
        return employeeMapper.toAdminDTO(updated);
    }

    private void updateEmployeeFields(Employee existingEmployee, EmployeeDto employeeDto) {
        existingEmployee.setManagerName(employeeDto.getManagerName());
        existingEmployee.setCurrentProjectName(employeeDto.getCurrentProjectName());

        if (employeeDto.getPersonalDetails() != null) {
            PersonalDetails existingPersonalDetails = existingEmployee.getPersonalDetails();
            if (existingPersonalDetails == null) {
                existingPersonalDetails = new PersonalDetails();
                existingEmployee.setPersonalDetails(existingPersonalDetails);
            }
            existingPersonalDetails.setFullName(employeeDto.getPersonalDetails().getFullName());
            existingPersonalDetails.setAge(employeeDto.getPersonalDetails().getAge());
            existingPersonalDetails.setCurrentAddress(employeeDto.getPersonalDetails().getCurrentAddress());
            existingPersonalDetails.setPermanentAddress(employeeDto.getPersonalDetails().getPermanentAddress());
            existingPersonalDetails.setMobile(employeeDto.getPersonalDetails().getMobile());
            existingPersonalDetails.setPersonalEmail(employeeDto.getPersonalDetails().getPersonalEmail());
            existingPersonalDetails.setEmergencyContactName(employeeDto.getPersonalDetails().getEmergencyContactName());
            existingPersonalDetails.setEmergencyContactMobile(employeeDto.getPersonalDetails().getEmergencyContactMobile());
        }

        if (employeeDto.getProfessionalDetails() != null) {
            ProfessionalDetails existingProfessionalDetails = existingEmployee.getProfessionalDetails();
            if (existingProfessionalDetails == null) {
                existingProfessionalDetails = new ProfessionalDetails();
                existingEmployee.setProfessionalDetails(existingProfessionalDetails);
            }
            existingProfessionalDetails.setOfficePhone(employeeDto.getProfessionalDetails().getOfficePhone());
            existingProfessionalDetails.setOfficeAddress(employeeDto.getProfessionalDetails().getOfficeAddress());
            existingProfessionalDetails.setReportingManagerEmployeeCode(employeeDto.getProfessionalDetails().getReportingManagerEmployeeCode());
            existingProfessionalDetails.setHrName(employeeDto.getProfessionalDetails().getHrName());
            existingProfessionalDetails.getEmploymentHistory().clear();
            if (employeeDto.getProfessionalDetails().getEmploymentHistory() != null) {
                existingProfessionalDetails.getEmploymentHistory().addAll(employeeDto.getProfessionalDetails().getEmploymentHistory());
            }
        }

        if (employeeDto.getProjects() != null) {
            existingEmployee.getProjects().clear();
            existingEmployee.getProjects().addAll(employeeDto.getProjects());
        }

        if (employeeDto.getFinance() != null) {
            Finance existingFinance = existingEmployee.getFinance();
            if (existingFinance == null) {
                existingFinance = new Finance();
                existingEmployee.setFinance(existingFinance);
            }
            existingFinance.setPanCard(employeeDto.getFinance().getPanCard());
            existingFinance.setAadharCard(employeeDto.getFinance().getAadharCard());
            existingFinance.setCtcBreakup(employeeDto.getFinance().getCtcBreakup());
            if (employeeDto.getFinance().getBankDetails() != null) {
                BankDetails existingBankDetails = existingFinance.getBankDetails();
                if (existingBankDetails == null) {
                    existingBankDetails = new BankDetails();
                    existingFinance.setBankDetails(existingBankDetails);
                }
                existingBankDetails.setBankName(employeeDto.getFinance().getBankDetails().getBankName());
                existingBankDetails.setBranch(employeeDto.getFinance().getBankDetails().getBranch());
                existingBankDetails.setIfscCode(employeeDto.getFinance().getBankDetails().getIfscCode());
            }
        }

        validateDates(
                existingEmployee.getProfessionalDetails() != null ?
                        existingEmployee.getProfessionalDetails().getEmploymentHistory() : Collections.emptyList(),
                existingEmployee.getProjects()
        );
    }

    @Override
    public void deleteEmployee(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Employee ID cannot be null");
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public boolean isEmployeeOwner(String username, Long employeeId) {
        if (employeeId == null) {
            return false;
        }
        return employeeRepository.findById(employeeId)
                .map(employee -> employee.getUser() != null && employee.getUser().getEmail().equals(username))
                .orElse(false);
    }

    @Override
    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findByUserEmail(email).orElse(null);
    }

    @Override
    public Optional<Employee> getEmployeeByName(String name) {
        if (name == null || name.isBlank()) {
            return Optional.empty();
        }
        return employeeRepository.findFirstByPersonalDetailsFullNameIgnoreCase(name.trim());
    }

    @Override
    public Employee getHighestSalaryEmployee() {
        return employeeRepository.findAll()
                .stream()
                .max(Comparator.comparingInt(this::extractSalary))
                .orElse(null);
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

    @Override
    public byte[] downloadPayslip(Long employeeId, String username) {
        if (employeeId == null) {
            throw new IllegalArgumentException("Employee ID cannot be null for downloading payslip.");
        }
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + employeeId));

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph("----------------------------------------------------"));
            document.add(new Paragraph("                  PAYSLIP - " + getSafeFullName(employee).toUpperCase()));
            document.add(new Paragraph("----------------------------------------------------"));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Personal Details:"));
            document.add(new Paragraph("  Full Name: " + getSafeFullName(employee)));
            document.add(new Paragraph("  Employment Code: " + getSafeEmploymentCode(employee)));
            document.add(new Paragraph("  Date of Birth: " + getSafeDateOfBirth(employee)));
            document.add(new Paragraph("  Gender: " + getSafeGender(employee)));
            document.add(new Paragraph("  Personal Email: " + getSafePersonalEmail(employee)));
            document.add(new Paragraph("  Mobile: " + getSafeMobile(employee)));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Professional Details:"));
            document.add(new Paragraph("  Company Email: " + getSafeCompanyEmail(employee)));
            document.add(new Paragraph("  Date of Joining: " + getSafeDateOfJoining(employee)));
            document.add(new Paragraph("  Manager Name: " + employee.getManagerName()));
            document.add(new Paragraph("  HR Name: " + getSafeHrName(employee)));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Finance Details:"));
            Finance finance = employee.getFinance();
            if (finance != null) {
                document.add(new Paragraph("  PAN Card: " + maskingUtils.maskPAN(finance.getPanCard())));
                document.add(new Paragraph("  Aadhar Card: " + maskingUtils.maskAadhar(finance.getAadharCard())));
                if (finance.getBankDetails() != null) {
                    document.add(new Paragraph("  Bank Name: " + finance.getBankDetails().getBankName()));
                    document.add(new Paragraph("  Branch: " + finance.getBankDetails().getBranch()));
                    document.add(new Paragraph("  IFSC Code: " + finance.getBankDetails().getIfscCode()));
                }
                document.add(new Paragraph("  CTC Breakup: " + finance.getCtcBreakup()));
            }
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Note: This payslip is for the period of [Month Year] (Placeholder)."));
            document.add(new Paragraph("Generated on: " + LocalDate.now()));

            document.close();
            return baos.toByteArray();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error generating payslip for employee ID: " + employeeId, e);
        }
    }

    // Safe getters for null handling
    private String getSafeFullName(Employee employee) {
        return employee.getPersonalDetails() != null ? employee.getPersonalDetails().getFullName() : "N/A";
    }

    private String getSafeEmploymentCode(Employee employee) {
        return employee.getProfessionalDetails() != null ? employee.getProfessionalDetails().getEmploymentCode() : "N/A";
    }

    private String getSafeDateOfBirth(Employee employee) {
        return employee.getPersonalDetails() != null && employee.getPersonalDetails().getDateOfBirth() != null
                ? employee.getPersonalDetails().getDateOfBirth().toString()
                : "N/A";
    }

    private String getSafeGender(Employee employee) {
        return employee.getPersonalDetails() != null ? employee.getPersonalDetails().getGender() : "N/A";
    }

    private String getSafePersonalEmail(Employee employee) {
        return employee.getPersonalDetails() != null ? employee.getPersonalDetails().getPersonalEmail() : "N/A";
    }

    private String getSafeMobile(Employee employee) {
        return employee.getPersonalDetails() != null ? employee.getPersonalDetails().getMobile() : "N/A";
    }

    private String getSafeCompanyEmail(Employee employee) {
        return employee.getProfessionalDetails() != null ? employee.getProfessionalDetails().getCompanyEmail() : "N/A";
    }

    private String getSafeDateOfJoining(Employee employee) {
        return employee.getProfessionalDetails() != null && employee.getProfessionalDetails().getDateOfJoining() != null
                ? employee.getProfessionalDetails().getDateOfJoining().toString()
                : "N/A";
    }

    private String getSafeHrName(Employee employee) {
        return employee.getProfessionalDetails() != null ? employee.getProfessionalDetails().getHrName() : "N/A";
    }
}