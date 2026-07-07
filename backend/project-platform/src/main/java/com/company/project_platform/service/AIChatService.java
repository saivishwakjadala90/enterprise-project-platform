package com.company.project_platform.service;

import com.company.project_platform.dto.AIChatResponse;
import com.company.project_platform.entity.Project;
import com.company.project_platform.entity.Task;
import com.company.project_platform.repository.ProjectRepository;
import com.company.project_platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AIChatService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final AIService aiService;
    private final OpenAIService openAIService;

    public AIChatService(ProjectRepository projectRepository,
                         TaskRepository taskRepository,
                         AIService aiService,
                         OpenAIService openAIService) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.aiService = aiService;
        this.openAIService = openAIService;
    }

    public AIChatResponse askQuestion(String question) {
        String q = question.toLowerCase();

        List<Project> projects = projectRepository.findAll();
        List<Task> tasks = taskRepository.findAll();

        long totalProjects = projects.size();
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

        if (q.contains("at risk") || q.contains("risky") || q.contains("risk")) {
            return new AIChatResponse(buildRiskResponse(projects, tasks));
        }

        if (q.contains("health")) {
            return new AIChatResponse(
                    "Project health is currently " +
                            aiService.generateInsight().getHealthScore() +
                            "%. Risk level is " +
                            aiService.generateInsight().getRiskLevel() + "."
            );
        }

        if (q.contains("summary") || q.contains("sprint")) {
            return new AIChatResponse(
                    "Sprint summary: " +
                            totalTasks + " total task(s), " +
                            completedTasks + " completed, " +
                            pendingTasks + " pending, across " +
                            totalProjects + " project(s)."
            );
        }

        if (q.contains("project")) {
            return new AIChatResponse(buildProjectResponse(projects));
        }

        if (q.contains("task")) {
            return new AIChatResponse(
                    "There are currently " +
                            totalTasks +
                            " task(s): " +
                            completedTasks +
                            " completed, " +
                            pendingTasks +
                            " pending, " +
                            highPriorityTasks +
                            " high priority, and " +
                            blockedTasks +
                            " blocked."
            );
        }

        String prompt =
                "User question: " + question + "\n" +
                        "Total projects: " + totalProjects + "\n" +
                        "Total tasks: " + totalTasks + "\n" +
                        "Completed tasks: " + completedTasks + "\n" +
                        "Pending tasks: " + pendingTasks + "\n" +
                        "High priority tasks: " + highPriorityTasks + "\n" +
                        "Blocked tasks: " + blockedTasks + "\n" +
                        "Give a concise enterprise project delivery recommendation.";

        return new AIChatResponse(openAIService.askOpenAI(prompt));
    }

    private String buildRiskResponse(List<Project> projects, List<Task> tasks) {
        if (projects.isEmpty()) {
            return "No projects are available to analyze.";
        }

        StringBuilder response = new StringBuilder();
        response.append("Risk analysis by project:\n\n");

        boolean riskFound = false;

        for (Project project : projects) {
            long projectTasks = tasks.stream()
                    .filter(task -> task.getProjectId() != null && task.getProjectId().equals(project.getId()))
                    .count();

            long blocked = tasks.stream()
                    .filter(task -> task.getProjectId() != null && task.getProjectId().equals(project.getId()))
                    .filter(task -> "BLOCKED".equalsIgnoreCase(task.getStatus()))
                    .count();

            long highPriority = tasks.stream()
                    .filter(task -> task.getProjectId() != null && task.getProjectId().equals(project.getId()))
                    .filter(task -> "HIGH".equalsIgnoreCase(task.getPriority()))
                    .count();

            long completed = tasks.stream()
                    .filter(task -> task.getProjectId() != null && task.getProjectId().equals(project.getId()))
                    .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                    .count();

            if (blocked > 0 || highPriority > 0 || "BLOCKED".equalsIgnoreCase(project.getStatus())) {
                riskFound = true;

                response.append("- ")
                        .append(project.getProjectName())
                        .append(": ");

                if ("BLOCKED".equalsIgnoreCase(project.getStatus())) {
                    response.append("Project status is BLOCKED. ");
                }

                response.append(blocked)
                        .append(" blocked task(s), ")
                        .append(highPriority)
                        .append(" high priority task(s), ")
                        .append(completed)
                        .append("/")
                        .append(projectTasks)
                        .append(" task(s) completed.\n");
            }
        }

        if (!riskFound) {
            return "No major project risks detected. There are no blocked projects or blocked tasks at this time.";
        }

        response.append("\nRecommendation: Focus on blocked and high priority tasks before starting new work.");

        return response.toString();
    }

    private String buildProjectResponse(List<Project> projects) {
        if (projects.isEmpty()) {
            return "There are currently no projects in the system.";
        }

        StringBuilder response = new StringBuilder();
        response.append("Current projects:\n\n");

        for (Project project : projects) {
            response.append("- ")
                    .append(project.getProjectName())
                    .append(" | Status: ")
                    .append(project.getStatus())
                    .append(" | Priority: ")
                    .append(project.getPriority())
                    .append("\n");
        }

        return response.toString();
    }
}