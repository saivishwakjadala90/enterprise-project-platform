package com.company.project_platform.controller;

import com.company.project_platform.dto.DashboardSummary;
import com.company.project_platform.repository.ProjectRepository;
import com.company.project_platform.repository.TaskRepository;
import com.company.project_platform.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DashboardController(UserRepository userRepository,
                               ProjectRepository projectRepository,
                               TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public DashboardSummary getDashboardSummary() {

        long totalUsers = userRepository.count();
        long totalProjects = projectRepository.count();
        long totalTasks = taskRepository.count();

        long completedTasks = taskRepository.findAll()
                .stream()
                .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                .count();

        long pendingTasks = totalTasks - completedTasks;

        return new DashboardSummary(
                totalUsers,
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks
        );
    }
}