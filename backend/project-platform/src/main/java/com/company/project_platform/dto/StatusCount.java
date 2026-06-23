package com.company.project_platform.dto;

public class StatusCount {

    private String status;
    private long count;

    public StatusCount(String status, long count) {
        this.status = status;
        this.count = count;
    }

    public String getStatus() {
        return status;
    }

    public long getCount() {
        return count;
    }
}