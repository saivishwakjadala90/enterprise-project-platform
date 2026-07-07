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

    public AIChatService(ProjectRepository projectRepository,
                         TaskRepository taskRepository,
                         AIService aiService) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.aiService = aiService;
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

        if (q.contains("health")) {
            return new AIChatResponse(
                    "Project health is currently " +
                            aiService.generateInsight().getHealthScore() +
                            "%. Risk level is " +
                            aiService.generateInsight().getRiskLevel() + "."
            );
        }

        if (q.contains("risk")) {
            return new AIChatResponse(
                    "Current risks: " +
                            blockedTasks + " blocked task(s), " +
                            highPriorityTasks + " high priority task(s), and " +
                            pendingTasks + " pending task(s)."
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
            return new AIChatResponse(
                    "There are currently " +
                            totalProjects +
                            " project(s) in the system."
            );
        }

        if (q.contains("task")) {
            return new AIChatResponse(
                    "There are currently " +
                            totalTasks +
                            " task(s): " +
                            completedTasks +
                            " completed and " +
                            pendingTasks +
                            " pending."
            );
        }

        return new AIChatResponse(
                "I can help with sprint summaries, project health, risks, projects, and tasks. Try asking: 'summarize my sprint' or 'what risks do we have?'"
        );
    }
}