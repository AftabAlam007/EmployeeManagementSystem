package com.example.employeemanagementsystem.dto;

import com.example.employeemanagementsystem.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response DTO for employee self-view - includes all details with sensitive data masked
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeViewDTO {
    private Long id;
    private String managerName;
    private String currentProjectName;

    // Nested objects with masked sensitive data
    private PersonalDetailsView personalDetails;
    private ProfessionalDetailsView professionalDetails;
    private List<ProjectView> projects;
    private FinanceView finance;

    // Nested DTOs for view with masking
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PersonalDetailsView {
        private Long id;
        private String fullName;
        private String dateOfBirth;
        private String gender;
        private int age;
        private Address currentAddress;
        private Address permanentAddress;
        private String mobile;
        private String personalEmail;
        private String emergencyContactName;
        private String emergencyContactMobile;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProfessionalDetailsView {
        private Long id;
        private String employmentCode;
        private String companyEmail;
        private String officePhone;
        private Address officeAddress;
        private String reportingManagerEmployeeCode;
        private String hrName;
        private String dateOfJoining;
        private List<EmploymentHistory> employmentHistory;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectView {
        private Long id;
        private String clientOrProjectName;
        private String projectCode;
        private String startDate;
        private String endDate;
        private String reportingManagerEmployeeCode;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FinanceView {
        private Long id;
        private String maskedPAN;
        private String maskedAadhar;
        private BankDetailsView bankDetails;
        private String ctcBreakup;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BankDetailsView {
        private Long id;
        private String bankName;
        private String branch;
        private String ifscCode;
    }
}