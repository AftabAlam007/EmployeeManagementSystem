package com.example.employeemanagementsystem.config;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

/**
 * Condition that checks if the OpenAI API key is configured.
 * Returns true if ${OPENAI_API_KEY} is set and not empty.
 */
public class OpenApiKeyCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String apiKey = context.getEnvironment().getProperty("OPENAI_API_KEY");
        return apiKey != null && !apiKey.trim().isEmpty() 
               && !apiKey.trim().equals("your_api_key_here");
    }
}
