package com.example.employeemanagementsystem.mapper;

import com.example.employeemanagementsystem.dto.AdminEmployeeResponseDTO;
import com.example.employeemanagementsystem.dto.EmployeeSummaryDTO;
import com.example.employeemanagementsystem.dto.EmployeeViewDTO;
import com.example.employeemanagementsystem.model.*;
import com.example.employeemanagementsystem.util.MaskingUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper class to convert Employee entities to response DTOs
 * Handles role-based responses with data masking
 */
@Component
public class EmployeeMapper {

    private final MaskingUtils maskingUtils;

    @Autowired
    public EmployeeMapper(MaskingUtils maskingUtils) {
        this.maskingUtils = maskingUtils;
    }

    /**
     * Converts Employee entity to a summary DTO for regular users
     * Contains only basic public information: name, email, project, manager
     */
    public EmployeeSummaryDTO toSummaryDTO(Employee employee) {
        if (employee == null) {
            return null;
        }

        EmployeeSummaryDTO dto = new EmployeeSummaryDTO();
        dto.setId(employee.getId());

        // Extract name from PersonalDetails
        PersonalDetails pd = employee.getPersonalDetails();
        if (pd != null) {
            dto.setName(pd.getFullName());
        }

        // Extract email from User
        User user = employee.getUser();
        if (user != null) {
            dto.setEmail(user.getEmail());
        }

        dto.setProject(employee.getCurrentProjectName());
        dto.setManager(employee.getManagerName());

        return dto;
    }

    /**
     * Converts Employee entity to employee view DTO with all details (masked for security)
     * Used for employee self-view in dashboard
     */
    public EmployeeViewDTO toViewDTO(Employee employee) {
        if (employee == null) {
            return null;
        }

        EmployeeViewDTO dto = new EmployeeViewDTO();
        dto.setId(employee.getId());
        dto.setManagerName(employee.getManagerName());
        dto.setCurrentProjectName(employee.getCurrentProjectName());

        // Personal Details
        PersonalDetails pd = employee.getPersonalDetails();
        if (pd != null) {
            EmployeeViewDTO.PersonalDetailsView pdView = new EmployeeViewDTO.PersonalDetailsView();
            pdView.setId(pd.getId());
            pdView.setFullName(pd.getFullName());
            pdView.setDateOfBirth(pd.getDateOfBirth() != null ? pd.getDateOfBirth().toString() : null);
            pdView.setGender(pd.getGender());
            pdView.setAge(pd.getAge());
            pdView.setCurrentAddress(pd.getCurrentAddress());
            pdView.setPermanentAddress(pd.getPermanentAddress());
            pdView.setMobile(pd.getMobile());
            pdView.setPersonalEmail(pd.getPersonalEmail());
            pdView.setEmergencyContactName(pd.getEmergencyContactName());
            pdView.setEmergencyContactMobile(pd.getEmergencyContactMobile());
            dto.setPersonalDetails(pdView);
        }

        // Professional Details
        ProfessionalDetails prof = employee.getProfessionalDetails();
        if (prof != null) {
            EmployeeViewDTO.ProfessionalDetailsView profView = new EmployeeViewDTO.ProfessionalDetailsView();
            profView.setId(prof.getId());
            profView.setEmploymentCode(prof.getEmploymentCode());
            profView.setCompanyEmail(prof.getCompanyEmail());
            profView.setOfficePhone(prof.getOfficePhone());
            profView.setOfficeAddress(prof.getOfficeAddress());
            profView.setReportingManagerEmployeeCode(prof.getReportingManagerEmployeeCode());
            profView.setHrName(prof.getHrName());
            profView.setDateOfJoining(prof.getDateOfJoining() != null ? prof.getDateOfJoining().toString() : null);
            profView.setEmploymentHistory(prof.getEmploymentHistory());
            dto.setProfessionalDetails(profView);
        }

        // Projects
        List<Project> projects = employee.getProjects();
        if (projects != null && !projects.isEmpty()) {
            List<EmployeeViewDTO.ProjectView> projectViews = projects.stream().map(project -> {
                EmployeeViewDTO.ProjectView pv = new EmployeeViewDTO.ProjectView();
                pv.setId(project.getId());
                pv.setClientOrProjectName(project.getClientOrProjectName());
                pv.setProjectCode(project.getProjectCode());
                pv.setStartDate(project.getStartDate() != null ? project.getStartDate().toString() : null);
                pv.setEndDate(project.getEndDate() != null ? project.getEndDate().toString() : null);
                pv.setReportingManagerEmployeeCode(project.getReportingManagerEmployeeCode());
                return pv;
            }).collect(Collectors.toList());
            dto.setProjects(projectViews);
        }

        // Finance (with masking)
        Finance finance = employee.getFinance();
        if (finance != null) {
            EmployeeViewDTO.FinanceView financeView = new EmployeeViewDTO.FinanceView();
            financeView.setId(finance.getId());
            financeView.setMaskedPAN(maskingUtils.maskPAN(finance.getPanCard()));
            financeView.setMaskedAadhar(maskingUtils.maskAadhar(finance.getAadharCard()));
            financeView.setCtcBreakup(finance.getCtcBreakup());

            if (finance.getBankDetails() != null) {
                EmployeeViewDTO.BankDetailsView bankView = new EmployeeViewDTO.BankDetailsView();
                bankView.setId(finance.getBankDetails().getId());
                bankView.setBankName(finance.getBankDetails().getBankName());
                bankView.setBranch(finance.getBankDetails().getBranch());
                bankView.setIfscCode(finance.getBankDetails().getIfscCode());
                financeView.setBankDetails(bankView);
            }

            dto.setFinance(financeView);
        }

        return dto;
    }

    /**
     * Converts Employee entity to admin response DTO with masked sensitive data
     * Contains all summary fields plus finance and professional details (masked)
     */
    public AdminEmployeeResponseDTO toAdminDTO(Employee employee) {
        if (employee == null) {
            return null;
        }

        AdminEmployeeResponseDTO dto = new AdminEmployeeResponseDTO();
        dto.setId(employee.getId());

        PersonalDetails pd = employee.getPersonalDetails();
        if (pd != null) {
            dto.setName(pd.getFullName());
        }

        User user = employee.getUser();
        if (user != null) {
            dto.setEmail(user.getEmail());
        }

        dto.setProject(employee.getCurrentProjectName());
        dto.setManager(employee.getManagerName());

        ProfessionalDetails prof = employee.getProfessionalDetails();
        if (prof != null) {
            dto.setEmploymentCode(prof.getEmploymentCode());
            dto.setDateOfJoining(prof.getDateOfJoining() != null ? prof.getDateOfJoining().toString() : null);
            dto.setReportingManagerCode(prof.getReportingManagerEmployeeCode());
            dto.setHrName(prof.getHrName());
        }

        Finance finance = employee.getFinance();
        if (finance != null) {
            // Mask sensitive data
            dto.setMaskedAadhar(maskingUtils.maskAadhar(finance.getAadharCard()));
            dto.setMaskedPAN(maskingUtils.maskPAN(finance.getPanCard()));
            dto.setCtcBreakup(finance.getCtcBreakup());

            if (finance.getBankDetails() != null) {
                dto.setBankName(finance.getBankDetails().getBankName());
                dto.setBranch(finance.getBankDetails().getBranch());
                dto.setIfscCode(finance.getBankDetails().getIfscCode());
            }
        }

        return dto;
    }

    /**
     * Converts a list of employees to summary DTOs
     */
    public java.util.List<EmployeeSummaryDTO> toSummaryDTOList(java.util.List<Employee> employees) {
        return employees.stream()
                .map(this::toSummaryDTO)
                .filter(dto -> dto != null)
                .toList();
    }

    /**
     * Converts a list of employees to admin DTOs
     */
    public java.util.List<AdminEmployeeResponseDTO> toAdminDTOList(java.util.List<Employee> employees) {
        return employees.stream()
                .map(this::toAdminDTO)
                .filter(dto -> dto != null)
                .toList();
    }
}