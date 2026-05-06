package com.example.employeemanagementsystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "bank_details")
public class BankDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Bank name cannot be empty")
    private String bankName;
    @NotBlank(message = "Branch cannot be empty")
    private String branch;
    @NotBlank(message = "IFSC code cannot be empty")
    private String ifscCode;

    @OneToOne(mappedBy = "bankDetails")
    @JsonBackReference
    private Finance finance;
}