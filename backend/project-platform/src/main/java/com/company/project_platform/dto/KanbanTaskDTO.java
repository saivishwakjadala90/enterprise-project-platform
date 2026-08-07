package com.company.project_platform.dto;

public class KanbanTaskDTO {

    private Long id;
    private String taskName;
    private String priority;
    private String assignedTo;
    private String status;

    public KanbanTaskDTO() {
    }

    public KanbanTaskDTO(Long id,
                         String taskName,
                         String priority,
                         String assignedTo,
                         String status) {

        this.id = id;
        this.taskName = taskName;
        this.priority = priority;
        this.assignedTo = assignedTo;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getPriority() {
        return priority;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}