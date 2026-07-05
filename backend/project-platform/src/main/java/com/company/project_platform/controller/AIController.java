package com.company.project_platform.controller;

import com.company.project_platform.dto.AIInsight;
import com.company.project_platform.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/insights")
    public AIInsight getAIInsights() {
        return aiService.generateInsight();
    }
}