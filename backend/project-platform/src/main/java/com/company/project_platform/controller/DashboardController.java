package com.company.project_platform.controller;

import com.company.project_platform.dto.DashboardSummary;
import com.company.project_platform.dto.DeliveryAnalytics;
import com.company.project_platform.dto.ExecutiveMetrics;
import com.company.project_platform.dto.StatusCount;
import com.company.project_platform.dto.UserActivity;
import com.company.project_platform.repository.ActivityLogRepository;
import com.company.project_platform.repository.NotificationRepository;
import com.company.project_platform.repository.ProjectRepository;
import com.company.project_platform.repository.TaskRepository;
import com.company.project_platform.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final ActivityLogRepository activityLogRepository;
    private final NotificationRepository notificationRepository;

    public DashboardController(UserRepository userRepository,
                               ProjectRepository projectRepository,
                               TaskRepository taskRepository,
                               ActivityLogRepository activityLogRepository,
                               NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.activityLogRepository = activityLogRepository;
        this.notificationRepository = notificationRepository;
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

        return new DashboardSummary(totalUsers, totalProjects, totalTasks, completedTasks, pendingTasks);
    }

    @GetMapping("/projects-by-status")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StatusCount> getProjectsByStatus() {
        return projectRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        project -> project.getStatus(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new StatusCount(entry.getKey(), entry.getValue()))
                .toList();
    }

    @GetMapping("/tasks-by-priority")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StatusCount> getTasksByPriority() {
        return taskRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        task -> task.getPriority(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new StatusCount(entry.getKey(), entry.getValue()))
                .toList();
    }

    @GetMapping("/user-activity")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<UserActivity> getUserActivity() {
        return activityLogRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        activity -> activity.getType() == null
                                ? "UNKNOWN"
                                : activity.getType(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new UserActivity(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }

    @GetMapping("/team-workload")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<UserActivity> getTeamWorkload() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserActivity(
                        user.getName(),
                        taskRepository.findAll()
                                .stream()
                                .filter(task -> user.getEmail().equalsIgnoreCase(task.getAssignedTo()))
                                .count()
                ))
                .toList();
    }


    @GetMapping("/executive-metrics")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ExecutiveMetrics getExecutiveMetrics() {
        long activeProjects = projectRepository.findAll()
                .stream()
                .filter(project -> "IN_PROGRESS".equalsIgnoreCase(project.getStatus()))
                .count();

        long completedProjects = projectRepository.findAll()
                .stream()
                .filter(project -> "COMPLETED".equalsIgnoreCase(project.getStatus()))
                .count();

        long highPriorityTasks = taskRepository.findAll()
                .stream()
                .filter(task -> "HIGH".equalsIgnoreCase(task.getPriority()))
                .count();

        long unreadNotifications = notificationRepository.findAll()
                .stream()
                .filter(notification -> "UNREAD".equalsIgnoreCase(notification.getStatus()))
                .count();

        return new ExecutiveMetrics(activeProjects, completedProjects, highPriorityTasks, unreadNotifications);
    }

    @GetMapping("/delivery-analytics")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public DeliveryAnalytics getDeliveryAnalytics() {
        long totalTasks = taskRepository.count();

        long completedTasks = taskRepository.findAll()
                .stream()
                .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                .count();

        long pendingTasks = totalTasks - completedTasks;

        double completionRate = totalTasks == 0
                ? 0
                : (completedTasks * 100.0) / totalTasks;

        return new DeliveryAnalytics(totalTasks, completedTasks, pendingTasks, completionRate);
    }


    @GetMapping("/project-progress")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<java.util.Map<String, Object>> getProjectProgress() {

        return projectRepository.findAll()
                .stream()
                .map(project -> {

                    List<com.company.project_platform.entity.Task> tasks =
                            taskRepository.findAll()
                                    .stream()
                                    .filter(task ->
                                            project.getId().equals(task.getProjectId()))
                                    .toList();

                    long totalTasks = tasks.size();

                    long completedTasks = tasks.stream()
                            .filter(task ->
                                    "COMPLETED".equalsIgnoreCase(task.getStatus()))
                            .count();

                    int progress = totalTasks == 0
                            ? 0
                            : (int) ((completedTasks * 100) / totalTasks);

                    java.util.Map<String, Object> map =
                            new java.util.HashMap<>();

                    map.put("name", project.getProjectName());
                    map.put("progress", progress);

                    return map;
                })
                .toList();
    }
}