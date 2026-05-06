package com.example.employeemanagementsystem.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class ProfessionalDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Employment code cannot be empty")
    @Pattern(regexp = "\\d{6}", message = "Employment code must be a 6-digit number")
    private String employmentCode;
    @NotBlank(message = "Company email cannot be empty")
    @Email(message = "Invalid company email format")
    private String companyEmail;
    @NotBlank(message = "Office phone cannot be empty")
    @Size(min = 8, max = 12, message = "Office phone must be between 8 and 12 digits")
    @Pattern(regexp = "\\d+", message = "Office phone must contain only digits")
    private String officePhone;
    @Valid
    @NotNull(message = "Office address cannot be null")
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "addressLine1", column = @Column(name = "office_address_line1")),
            @AttributeOverride(name = "addressLine2", column = @Column(name = "office_address_line2")),
            @AttributeOverride(name = "city", column = @Column(name = "office_city")),
            @AttributeOverride(name = "pinCode", column = @Column(name = "office_pin_code"))
    })
    private Address officeAddress;
    @NotBlank(message = "Reporting manager employee code cannot be empty")
    private String reportingManagerEmployeeCode;
    @NotBlank(message = "HR name cannot be empty")
    private String hrName;
    @NotNull(message = "Date of joining cannot be null")
    @PastOrPresent(message = "Date of joining cannot be in the future")
    private LocalDate dateOfJoining;

    @Valid
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "professional_details_id")
    private List<EmploymentHistory> employmentHistory;
}
