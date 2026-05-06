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
public class EmploymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name cannot be empty")
    private String companyName;
    @NotNull(message = "Joining date cannot be null")
    @PastOrPresent(message = "Joining date cannot be in the future")
    private LocalDate joiningDate;
    @NotNull(message = "End date cannot be null")
    @PastOrPresent(message = "End date cannot be in the future") // Further validation (after joiningDate) will be in service
    private LocalDate endDate;
}
