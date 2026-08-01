package com.company.project_platform.service;

import com.company.project_platform.dto.WorkspaceOverview;
import com.company.project_platform.entity.Project;
import com.company.project_platform.entity.Task;
import com.company.project_platform.repository.ProjectRepository;
import com.company.project_platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkspaceService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public WorkspaceService(ProjectRepository projectRepository,
                            TaskRepository taskRepository) {

        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public WorkspaceOverview getWorkspaceOverview(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<Task> tasks = taskRepository.findAll()
                .stream()
                .filter(task -> projectId.equals(task.getProjectId()))
                .toList();

        long totalTasks = tasks.size();

        long completedTasks = tasks.stream()
                .filter(task ->
                        "COMPLETED".equalsIgnoreCase(task.getStatus()))
                .count();

        long pendingTasks = totalTasks - completedTasks;

        int progress = totalTasks == 0
                ? 0
                : (int) ((completedTasks * 100) / totalTasks);

        String risk;

        if (progress >= 80)
            risk = "LOW";
        else if (progress >= 50)
            risk = "MEDIUM";
        else
            risk = "HIGH";

        return new WorkspaceOverview(
                project.getId(),
                project.getProjectName(),
                project.getOwnerEmail(),
                totalTasks,
                completedTasks,
                pendingTasks,
                progress,
                project.getEndDate() != null
                        ? project.getEndDate().toString()
                        : "Not Set",
                risk
        );
    }

}