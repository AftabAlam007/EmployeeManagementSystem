package com.example.employeemanagementsystem.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class PersonalDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name cannot be empty")
    private String fullName;
    @NotNull(message = "Date of birth cannot be null")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    @NotBlank(message = "Gender cannot be empty")
    private String gender;
    @Min(value = 0, message = "Age must be a positive number")
    @Max(value = 999, message = "Age cannot exceed 3 digits")
    private int age;
    @Valid
    @NotNull(message = "Current address cannot be null")
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "addressLine1", column = @Column(name = "current_address_line1")),
            @AttributeOverride(name = "addressLine2", column = @Column(name = "current_address_line2")),
            @AttributeOverride(name = "city", column = @Column(name = "current_city")),
            @AttributeOverride(name = "pinCode", column = @Column(name = "current_pin_code"))
    })
    private Address currentAddress;
    @Valid
    @NotNull(message = "Permanent address cannot be null")
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "addressLine1", column = @Column(name = "permanent_address_line1")),
            @AttributeOverride(name = "addressLine2", column = @Column(name = "permanent_address_line2")),
            @AttributeOverride(name = "city", column = @Column(name = "permanent_city")),
            @AttributeOverride(name = "pinCode", column = @Column(name = "permanent_pin_code"))
    })
    private Address permanentAddress;
    @NotBlank(message = "Mobile number cannot be empty")
    @Pattern(regexp = "\\d{10}", message = "Mobile number must be a 10-digit number")
    private String mobile;
    @NotBlank(message = "Personal email cannot be empty")
    @Email(message = "Invalid personal email format")
    private String personalEmail;
    @NotBlank(message = "Emergency contact name cannot be empty")
    private String emergencyContactName;
    @NotBlank(message = "Emergency contact mobile number cannot be empty")
    @Pattern(regexp = "\\d{10}", message = "Emergency contact mobile number must be a 10-digit number")
    private String emergencyContactMobile;
}
