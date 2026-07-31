package com.company.project_platform.controller;

import com.company.project_platform.entity.ActivityLog;
import com.company.project_platform.service.ActivityLogService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity-logs")
@CrossOrigin(origins = "*")
public class ActivityLogController {

    private final ActivityLogService activityLogService;

    public ActivityLogController(ActivityLogService activityLogService) {
        this.activityLogService = activityLogService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<ActivityLog> getAllActivities() {
        return activityLogService.getAllActivities();
    }

    @GetMapping("/recent")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<ActivityLog> getRecentActivities() {
        return activityLogService.getRecentActivities();
    }
}