package com.example.employeemanagementsystem.dto;

import lombok.Data;

@Data
public class AIActionRequest {
    private String action;
    private String name;
    private Integer salary;
    private String managerName;
    private String projectName;
    private Integer limit;
    private String date;
}
