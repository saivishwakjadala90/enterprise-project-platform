package com.company.project_platform.dto;

public class KanbanTaskDTO {

    private Long id;
    private String title;
    private String priority;
    private String assignee;
    private String status;

    public KanbanTaskDTO() {
    }

    public KanbanTaskDTO(Long id,
                         String title,
                         String priority,
                         String assignee,
                         String status) {

        this.id = id;
        this.title = title;
        this.priority = priority;
        this.assignee = assignee;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getPriority() {
        return priority;
    }

    public String getAssignee() {
        return assignee;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}