package com.company.project_platform.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    private final String apiKey = System.getenv("OPENAI_API_KEY");

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public OpenAIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public String askOpenAI(String prompt) {

        if (apiKey == null || apiKey.isBlank()) {
            return null;
        }

        String url = "https://api.openai.com/v1/chat/completions";

        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put(
                "content",
                "You are an enterprise project delivery AI assistant. " +
                        "Analyze only the project data provided by the user. " +
                        "Give a concise executive summary with delivery health, " +
                        "major risks, and practical recommendations."
        );

        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4o-mini");
        requestBody.put(
                "messages",
                List.of(systemMessage, userMessage)
        );
        requestBody.put("temperature", 0.3);
        requestBody.put("max_tokens", 300);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            String.class
                    );

            JsonNode root = objectMapper.readTree(response.getBody());

            JsonNode choices = root.path("choices");

            if (!choices.isArray() || choices.isEmpty()) {
                return null;
            }

            return choices
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception exception) {
            System.err.println(
                    "OpenAI request failed: " +
                            exception.getMessage()
            );

            return null;
        }
    }
}