package com.company.project_platform.service;

import com.company.project_platform.dto.AIChatResponse;
import org.springframework.stereotype.Service;

@Service
public class AIChatService {

    public AIChatResponse askQuestion(String question) {

        String q = question.toLowerCase();

        if (q.contains("health")) {
            return new AIChatResponse(
                    "Project health is currently good. Delivery is on track."
            );
        }

        if (q.contains("risk")) {
            return new AIChatResponse(
                    "No major delivery risks are currently detected."
            );
        }

        if (q.contains("summary")) {
            return new AIChatResponse(
                    "Current sprint is progressing well with steady task completion."
            );
        }

        if (q.contains("project")) {
            return new AIChatResponse(
                    "Projects are progressing normally."
            );
        }

        return new AIChatResponse(
                "I understood your question, but I don't have enough context yet. LLM support will be added in the next sprint."
        );
    }
}