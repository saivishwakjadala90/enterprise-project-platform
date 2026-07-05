package com.company.project_platform.controller;

import com.company.project_platform.dto.AIChatRequest;
import com.company.project_platform.dto.AIChatResponse;
import com.company.project_platform.service.AIChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIChatController {

    private final AIChatService aiChatService;

    public AIChatController(AIChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/chat")
    public AIChatResponse askAI(@RequestBody AIChatRequest request) {
        return aiChatService.askQuestion(request.getQuestion());
    }
}