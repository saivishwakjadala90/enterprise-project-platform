package com.company.project_platform.service;

import com.company.project_platform.dto.AIInsight;
import com.company.project_platform.entity.Project;
import com.company.project_platform.entity.Task;
import com.company.project_platform.repository.ProjectRepository;
import com.company.project_platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public AIService(ProjectRepository projectRepository,
                     TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public AIInsight generateInsight() {
        List<Project> projects = projectRepository.findAll();
        List<Task> tasks = taskRepository.findAll();

        long totalTasks = tasks.size();

        long completedTasks = tasks.stream()
                .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                .count();

        long pendingTasks = totalTasks - completedTasks;

        long highPriorityTasks = tasks.stream()
                .filter(task -> "HIGH".equalsIgnoreCase(task.getPriority()))
                .count();

        long blockedTasks = tasks.stream()
                .filter(task -> "BLOCKED".equalsIgnoreCase(task.getStatus()))
                .count();

        int healthScore = calculateHealthScore(
                totalTasks,
                completedTasks,
                highPriorityTasks,
                blockedTasks
        );

        String riskLevel = calculateRiskLevel(healthScore);

        String sprintSummary =
                "The current sprint has " + totalTasks + " total tasks, " +
                        completedTasks + " completed tasks, and " +
                        pendingTasks + " pending tasks.";

        String executiveSummary = generateExecutiveSummary(
                healthScore,
                totalTasks,
                completedTasks,
                pendingTasks,
                highPriorityTasks,
                blockedTasks,
                projects.size()
        );

        List<String> risks = new ArrayList<>();

        if (blockedTasks > 0) {
            risks.add(blockedTasks + " blocked task(s) may delay delivery.");
        }

        if (highPriorityTasks > 0) {
            risks.add(highPriorityTasks + " high priority task(s) require immediate attention.");
        }

        if (projects.isEmpty()) {
            risks.add("No active projects found.");
        }

        if (risks.isEmpty()) {
            risks.add("No major risks detected.");
        }

        List<String> recommendations = new ArrayList<>();

        if (blockedTasks > 0) {
            recommendations.add("Resolve blocked tasks before starting new development.");
        }

        if (highPriorityTasks > 0) {
            recommendations.add("Prioritize high priority tasks in the next planning session.");
        }

        if (pendingTasks > completedTasks) {
            recommendations.add("Reduce pending task backlog to improve delivery confidence.");
        }

        if (recommendations.isEmpty()) {
            recommendations.add("Delivery looks healthy. Continue current execution plan.");
        }

        return new AIInsight(
                healthScore,
                riskLevel,
                sprintSummary,
                executiveSummary,
                risks,
                recommendations
        );
    }

    private int calculateHealthScore(long totalTasks,
                                     long completedTasks,
                                     long highPriorityTasks,
                                     long blockedTasks) {
        if (totalTasks == 0) {
            return 100;
        }

        double completionRate = (completedTasks * 100.0) / totalTasks;

        int score = (int) completionRate;

        score -= highPriorityTasks * 5;
        score -= blockedTasks * 10;

        return Math.max(0, Math.min(100, score));
    }

    private String calculateRiskLevel(int healthScore) {
        if (healthScore >= 80) {
            return "LOW";
        }

        if (healthScore >= 50) {
            return "MEDIUM";
        }

        return "HIGH";
    }

    private String generateExecutiveSummary(long healthScore,
                                            long totalTasks,
                                            long completedTasks,
                                            long pendingTasks,
                                            long highPriorityTasks,
                                            long blockedTasks,
                                            long totalProjects) {
        if (totalTasks == 0) {
            return "No task activity is currently available. Create projects and tasks to generate meaningful delivery insights.";
        }

        if (healthScore >= 80) {
            return "Overall project delivery is healthy. " +
                    completedTasks + " out of " + totalTasks +
                    " tasks have been completed across " + totalProjects +
                    " project(s). Current delivery risk is low.";
        }

        if (healthScore >= 50) {
            return "Project delivery is moderately healthy. " +
                    pendingTasks + " task(s) are still pending, with " +
                    highPriorityTasks + " high priority task(s) requiring attention.";
        }

        return "Project delivery is at risk. There are " +
                blockedTasks + " blocked task(s), " +
                highPriorityTasks + " high priority task(s), and " +
                pendingTasks + " pending task(s). Immediate action is recommended.";
    }
}