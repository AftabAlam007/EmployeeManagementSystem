package com.example.employeemanagementsystem.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Conditional;
import org.springframework.beans.factory.annotation.Value;

/**
 * Configuration for AI services. Only active when OPENAI_API_KEY is configured.
 */
@Configuration
public class AIConfig {

    /**
     * Creates a ChatClient bean only when the OpenAI API key is present.
     * This prevents application startup failures if the API key is not configured.
     */
    @Bean
    @Conditional(OpenApiKeyCondition.class)
    public ChatClient.Builder chatClientBuilder(ChatClient.Builder builder) {
        return builder;
    }
}
