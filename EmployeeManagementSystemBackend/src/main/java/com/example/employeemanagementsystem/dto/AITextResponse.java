package com.example.employeemanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for AI text responses - allows proper content-type handling
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AITextResponse {
    private String response;

    public static AITextResponse of(String text) {
        return new AITextResponse(text);
    }
}
