package com.example.employeemanagementsystem.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Embeddable
public class Address {
    @NotBlank(message = "Address Line 1 cannot be empty")
    private String addressLine1;
    private String addressLine2; // Optional based on common address forms
    @NotBlank(message = "City cannot be empty")
    private String city;
    @NotBlank(message = "Pin code cannot be empty")
    @Pattern(regexp = "\\d{6}", message = "Pin code must be a 6-digit number")
    private String pinCode;
}
