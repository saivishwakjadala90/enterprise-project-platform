package com.company.project_platform.dto;

public class DeliveryAnalytics {

    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private double completionRate;

    public DeliveryAnalytics(long totalTasks,
                             long completedTasks,
                             long pendingTasks,
                             double completionRate) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
        this.completionRate = completionRate;
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

    public double getCompletionRate() {
        return completionRate;
    }
}