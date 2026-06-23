# API Specification

## Base URL

```text
http://localhost:8080
```

---

# Authentication APIs

## Register User

POST /api/auth/register

Request

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

---

## Login User

POST /api/auth/login

Request

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

Response

```json
{
  "message": "Login successful",
  "email": "admin@test.com",
  "role": "ADMIN",
  "token": "<JWT_TOKEN>"
}
```

---

# User APIs

## Get All Users

GET /api/users

Authorization Required

---

# Project APIs

## Create Project

POST /api/projects

## Get All Projects

GET /api/projects

## Get Project By Id

GET /api/projects/{id}

## Update Project

PUT /api/projects/{id}

## Delete Project

DELETE /api/projects/{id}

---

# Task APIs

## Create Task

POST /api/tasks

## Get All Tasks

GET /api/tasks

## Get Task By Id

GET /api/tasks/{id}

## Update Task

PUT /api/tasks/{id}

## Delete Task

DELETE /api/tasks/{id}

---

# Comment APIs

## Create Comment

POST /api/comments

## Get All Comments

GET /api/comments

## Get Comment By Id

GET /api/comments/{id}

## Get Comments By Task

GET /api/comments/task/{taskId}

## Delete Comment

DELETE /api/comments/{id}

---

# Activity Log APIs

## Create Activity Log

POST /api/activity-logs

## Get All Activity Logs

GET /api/activity-logs

## Get Activity Log By Id

GET /api/activity-logs/{id}

## Delete Activity Log

DELETE /api/activity-logs/{id}

---

# Notification APIs

## Create Notification

POST /api/notifications

## Get All Notifications

GET /api/notifications

## Get Notification By Id

GET /api/notifications/{id}

## Get Notifications By User

GET /api/notifications/user/{email}

## Mark Notification As Read

PUT /api/notifications/{id}/read

## Delete Notification

DELETE /api/notifications/{id}

---

# Dashboard APIs

## Dashboard Summary

GET /api/dashboard/summary

Sample Response

```json
{
  "totalUsers": 10,
  "totalProjects": 5,
  "totalTasks": 42,
  "completedTasks": 30,
  "pendingTasks": 12
}
```

---

## Projects By Status

GET /api/dashboard/projects-by-status

Sample Response

```json
[
  {
    "status": "IN_PROGRESS",
    "count": 5
  },
  {
    "status": "COMPLETED",
    "count": 3
  }
]
```

---

## Tasks By Priority

GET /api/dashboard/tasks-by-priority

Sample Response

```json
[
  {
    "status": "HIGH",
    "count": 10
  },
  {
    "status": "MEDIUM",
    "count": 15
  }
]
```

---

# Security

* JWT Authentication
* BCrypt Password Encryption
* Role-Based Access Control (RBAC)
* Spring Security Method Authorization

---

# Current Version

v1.1
