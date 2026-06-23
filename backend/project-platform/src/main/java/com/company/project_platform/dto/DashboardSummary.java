package com.company.project_platform.dto;

public class DashboardSummary {

    private long totalUsers;
    private long totalProjects;
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;

    public DashboardSummary(long totalUsers,
                            long totalProjects,
                            long totalTasks,
                            long completedTasks,
                            long pendingTasks) {
        this.totalUsers = totalUsers;
        this.totalProjects = totalProjects;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }
}