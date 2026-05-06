package com.example.employeemanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for ADMIN role - includes masked sensitive financial and personal data
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminEmployeeResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String project;
    private String manager;
    private String employmentCode;
    private String dateOfJoining;
    private String reportingManagerCode;
    private String hrName;
    private String maskedAadhar;      // Format: XXXX-XXXX-1234
    private String maskedPAN;          // Format: ABCDE****
    private String ctcBreakup;
    private String bankName;
    private String branch;
    private String ifscCode;
}
