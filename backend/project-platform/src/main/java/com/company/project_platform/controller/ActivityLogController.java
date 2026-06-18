package com.company.project_platform.controller;

import com.company.project_platform.entity.ActivityLog;
import com.company.project_platform.repository.ActivityLogRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/activity-logs")
public class ActivityLogController {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogController(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ActivityLog createLog(@RequestBody ActivityLog activityLog) {
        activityLog.setCreatedAt(LocalDateTime.now());
        return activityLogRepository.save(activityLog);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ActivityLog> getAllLogs() {
        return activityLogRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ActivityLog getLogById(@PathVariable Long id) {
        return activityLogRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteLog(@PathVariable Long id) {
        activityLogRepository.deleteById(id);
        return "Activity log deleted successfully";
    }
}