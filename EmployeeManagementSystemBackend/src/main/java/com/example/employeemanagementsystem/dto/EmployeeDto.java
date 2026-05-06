package com.example.employeemanagementsystem.dto;

import com.example.employeemanagementsystem.model.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class EmployeeDto {
    private Long id;
    @Valid
    @NotNull(message = "User details cannot be null")
    private UserDto user;
    @NotBlank(message = "Manager name cannot be empty")
    private String managerName;
    private String currentProjectName; // Optional based on documentation
    @Valid
    @NotNull(message = "Personal details cannot be null")
    private PersonalDetails personalDetails;
    @Valid
    @NotNull(message = "Professional details cannot be null")
    private ProfessionalDetails professionalDetails;
    @Valid
    private List<Project> projects; // Optional based on documentation
    @Valid
    @NotNull(message = "Finance details cannot be null")
    private Finance finance;
}
