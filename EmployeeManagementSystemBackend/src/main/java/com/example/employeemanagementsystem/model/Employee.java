package com.example.employeemanagementsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String managerName;
    private String currentProjectName;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_details_id")
    private PersonalDetails personalDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "professional_details_id")
    private ProfessionalDetails professionalDetails;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private List<Project> projects;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "finance_id")
    private Finance finance;
}
