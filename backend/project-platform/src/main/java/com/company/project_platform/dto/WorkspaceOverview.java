package com.company.project_platform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceOverview {

    private Long projectId;

    private String projectName;

    private String manager;

    private long totalTasks;

    private long completedTasks;

    private long pendingTasks;

    private int progress;

    private String dueDate;

    private String risk;

}