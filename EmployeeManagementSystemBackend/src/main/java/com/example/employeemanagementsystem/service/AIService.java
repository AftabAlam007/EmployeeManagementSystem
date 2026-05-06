package com.example.employeemanagementsystem.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AIService {

    private final Optional<ChatClient.Builder> chatClientBuilder;
    private final Map<String, String> fallbackCommands;

    public AIService(Optional<ChatClient.Builder> chatClientBuilder) {
        this.chatClientBuilder = chatClientBuilder;
        this.fallbackCommands = new HashMap<>();
        initFallbackCommands();
    }

    private void initFallbackCommands() {
        fallbackCommands.put("show all employees", "{\"action\":\"GET_ALL\"}");
        fallbackCommands.put("get all employees", "{\"action\":\"GET_ALL\"}");
        fallbackCommands.put("list employees", "{\"action\":\"GET_ALL\"}");
        fallbackCommands.put("all employees", "{\"action\":\"GET_ALL\"}");
        fallbackCommands.put("count employees", "{\"action\":\"COUNT_EMPLOYEES\"}");
        fallbackCommands.put("how many employees", "{\"action\":\"COUNT_EMPLOYEES\"}");
        fallbackCommands.put("max salary", "{\"action\":\"MAX_SALARY\"}");
        fallbackCommands.put("minimum salary", "{\"action\":\"MIN_SALARY\"}");
        fallbackCommands.put("min salary", "{\"action\":\"MIN_SALARY\"}");
        fallbackCommands.put("average salary", "{\"action\":\"AVG_SALARY\"}");
        fallbackCommands.put("avg salary", "{\"action\":\"AVG_SALARY\"}");
    }

    public String convertPromptToActionJson(String userPrompt) {
        String lowerPrompt = userPrompt.toLowerCase().trim();
        if (fallbackCommands.containsKey(lowerPrompt)) {
            return fallbackCommands.get(lowerPrompt);
        }
        for (Map.Entry<String, String> entry : fallbackCommands.entrySet()) {
            if (lowerPrompt.contains(entry.getKey())) {
                return entry.getValue();
            }
        }

        if (!chatClientBuilder.isPresent()) {
            throw new IllegalArgumentException(
                "AI service unavailable (OpenAI API key not configured) and no fallback matched. " +
                "Try direct API call: GET /api/employees"
            );
        }

        try {
            String systemPrompt = """
                    You are an HR assistant for an Employee Management System.
                    Convert the user input into STRICT JSON only.
                    Allowed actions: GET_ALL, ADD, UPDATE, DELETE, MAX_SALARY, FIND_BY_NAME, GET_JOINING_DATE, GET_SALARY, MIN_SALARY, AVG_SALARY, COUNT_EMPLOYEES, GET_BY_MANAGER, GET_BY_PROJECT.
                    Allowed JSON formats:
                    {"action":"GET_ALL"}
                    {"action":"ADD","name":"Rahul","salary":50000}
                    {"action":"UPDATE","name":"Rahul","salary":70000}
                    {"action":"DELETE","name":"Rahul"}
                    {"action":"MAX_SALARY"}
                    {"action":"FIND_BY_NAME","name":"Rahul"}
                    {"action":"GET_JOINING_DATE","name":"Rahul"}
                    {"action":"GET_SALARY","name":"Rahul"}
                    {"action":"MIN_SALARY"}
                    {"action":"AVG_SALARY"}
                    {"action":"COUNT_EMPLOYEES"}
                    {"action":"GET_BY_MANAGER","managerName":"Amit"}
                    {"action":"GET_BY_PROJECT","projectName":"AI"}
                    Rules:
                    1) Output must be valid JSON object only, no markdown and no extra text.
                    2) action must be uppercase.
                    3) Include name only for ADD, UPDATE, DELETE, FIND_BY_NAME, GET_JOINING_DATE, GET_SALARY.
                    4) Include salary only for ADD and UPDATE.
                    5) Include managerName only for GET_BY_MANAGER.
                    6) Include projectName only for GET_BY_PROJECT.
                    7) If intent is unclear, output {\"action\":\"UNKNOWN\"}.
                    """;

            Object responseObj = chatClientBuilder.get().build()
                    .prompt()
                    .system(systemPrompt)
                    .user(userPrompt)
                    .call()
                    .content();
            if (!(responseObj instanceof String response) || response.isBlank()) {
                throw new IllegalArgumentException("AI model returned empty response");
            }
            return response;
        } catch (Exception e) {
            throw new IllegalArgumentException("AI service unavailable and no fallback matched. Try direct API call: GET /api/employees");
        }
    }
}
