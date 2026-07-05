package com.company.project_platform.dto;

import java.util.List;

public class AIInsight {

    private int healthScore;
    private String riskLevel;
    private String sprintSummary;
    private String executiveSummary;
    private List<String> risks;
    private List<String> recommendations;

    public AIInsight(int healthScore,
                     String riskLevel,
                     String sprintSummary,
                     String executiveSummary,
                     List<String> risks,
                     List<String> recommendations) {
        this.healthScore = healthScore;
        this.riskLevel = riskLevel;
        this.sprintSummary = sprintSummary;
        this.executiveSummary = executiveSummary;
        this.risks = risks;
        this.recommendations = recommendations;
    }

    public int getHealthScore() {
        return healthScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public String getSprintSummary() {
        return sprintSummary;
    }

    public String getExecutiveSummary() {
        return executiveSummary;
    }

    public List<String> getRisks() {
        return risks;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }
}