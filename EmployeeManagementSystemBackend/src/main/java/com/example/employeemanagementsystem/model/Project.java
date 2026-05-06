package com.example.employeemanagementsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Project code cannot be empty")
    private String projectCode;
    @NotNull(message = "Start date cannot be null")
    @PastOrPresent(message = "Start date cannot be in the future")
    private LocalDate startDate;
    @NotNull(message = "End date cannot be null")
    @PastOrPresent(message = "End date cannot be in the future") // Further validation (after startDate) will be in service
    private LocalDate endDate;
    @NotBlank(message = "Client or project name cannot be empty")
    private String clientOrProjectName;
    @NotBlank(message = "Reporting manager employee code cannot be empty")
    private String reportingManagerEmployeeCode;
}
