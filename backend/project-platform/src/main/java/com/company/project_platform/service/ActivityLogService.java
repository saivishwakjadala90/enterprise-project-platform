package com.company.project_platform.service;

import com.company.project_platform.entity.ActivityLog;
import com.company.project_platform.repository.ActivityLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityLogService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    public ActivityLog createActivity(String type, String message) {
        ActivityLog activityLog = new ActivityLog();

        activityLog.setType(type);
        activityLog.setMessage(message);

        return activityLogRepository.save(activityLog);
    }

    public List<ActivityLog> getAllActivities() {
        return activityLogRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
    }

    public List<ActivityLog> getRecentActivities() {
        return activityLogRepository.findAll(
                PageRequest.of(
                        0,
                        5,
                        Sort.by(Sort.Direction.DESC, "createdAt")
                )
        ).getContent();
    }
}