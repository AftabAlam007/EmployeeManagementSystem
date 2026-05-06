package com.example.employeemanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AIExecutionResponse {
    private String aiJson;
    private Object result;
}
