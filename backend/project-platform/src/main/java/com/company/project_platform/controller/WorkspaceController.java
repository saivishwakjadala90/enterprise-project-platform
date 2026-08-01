package com.company.project_platform.controller;

import com.company.project_platform.dto.WorkspaceOverview;
import com.company.project_platform.service.WorkspaceService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping("/{projectId}/overview")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public WorkspaceOverview getOverview(
            @PathVariable Long projectId) {

        return workspaceService.getWorkspaceOverview(projectId);
    }

}