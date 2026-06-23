package com.company.project_platform.dto;

public class ExecutiveMetrics {

    private long activeProjects;
    private long completedProjects;
    private long highPriorityTasks;
    private long unreadNotifications;

    public ExecutiveMetrics(long activeProjects,
                            long completedProjects,
                            long highPriorityTasks,
                            long unreadNotifications) {
        this.activeProjects = activeProjects;
        this.completedProjects = completedProjects;
        this.highPriorityTasks = highPriorityTasks;
        this.unreadNotifications = unreadNotifications;
    }

    public long getActiveProjects() {
        return activeProjects;
    }

    public long getCompletedProjects() {
        return completedProjects;
    }

    public long getHighPriorityTasks() {
        return highPriorityTasks;
    }

    public long getUnreadNotifications() {
        return unreadNotifications;
    }
}