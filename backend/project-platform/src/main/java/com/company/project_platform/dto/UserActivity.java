package com.company.project_platform.dto;

public class UserActivity {

    private String userEmail;
    private long activityCount;

    public UserActivity(String userEmail, long activityCount) {
        this.userEmail = userEmail;
        this.activityCount = activityCount;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public long getActivityCount() {
        return activityCount;
    }
}