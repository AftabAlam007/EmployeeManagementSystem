package com.example.employeemanagementsystem.controller;

import com.example.employeemanagementsystem.dto.ApiResponse;
import com.example.employeemanagementsystem.service.AIActionService;
import com.example.employeemanagementsystem.service.AIService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private static final Logger logger = LoggerFactory.getLogger(AIController.class);
    private final AIService aiService;
    private final AIActionService aiActionService;

    public AIController(AIService aiService, AIActionService aiActionService) {
        this.aiService = aiService;
        this.aiActionService = aiActionService;
    }

    @GetMapping("/execute")
    public ResponseEntity<ApiResponse<Object>> execute(@RequestParam String prompt) {
        logger.info("Received AI prompt: {}", prompt);
        try {
            String aiJson = aiService.convertPromptToActionJson(prompt);
            logger.info("AI JSON response: {}", aiJson);
            Object result = aiActionService.executeAction(aiJson);
            logger.info("AI action result type: {}", result != null ? result.getClass().getName() : "null");

            // Return formatted text response directly if it's a string
            if (result instanceof String stringResult) {
                return ResponseEntity.ok(ApiResponse.success(stringResult));
            }

            return ResponseEntity.ok(ApiResponse.success(result));
        } catch (IllegalArgumentException ex) {
            logger.error("Invalid argument: {}", ex.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
        } catch (Exception ex) {
            logger.error("Error executing AI command: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Unable to execute AI command: " + ex.getClass().getSimpleName() + " - " + ex.getMessage()));
        }
    }
}
