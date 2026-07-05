package com.company.project_platform.dto;

public class AIChatRequest {

    private String question;

    public AIChatRequest() {
    }

    public AIChatRequest(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}