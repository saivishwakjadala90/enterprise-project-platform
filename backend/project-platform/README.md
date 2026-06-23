# Enterprise AI Delivery Operating System

A Spring Boot based Enterprise Project Management Platform with JWT Authentication, Role-Based Access Control (RBAC), Project Management, Task Management, Notifications, Activity Tracking, Dashboard Reporting, and AI-powered delivery insights.

---

# Features

## Completed Features

* User Registration
* User Login
* BCrypt Password Encryption
* JWT Authentication
* JWT Authorization
* Protected REST APIs
* Project Management CRUD APIs
* Task Management CRUD APIs
* Comments & Collaboration Module
* Activity Logs & Audit Trail
* Notifications Module
* User-Specific Notifications
* Read/Unread Notification Status
* Role-Based Access Control (RBAC)
* ADMIN / MANAGER / EMPLOYEE Roles
* Dashboard Summary API
* Projects By Status API
* Tasks By Priority API
* User Activity Analytics API
* Executive Metrics API
* Delivery Analytics API
* API Testing using Postman
* Documentation Suite
* GitHub Integration

---

# Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT

## Database

* H2 Database (Development)
* PostgreSQL (Planned)

## Tools

* Maven
* IntelliJ IDEA
* Postman
* Git
* GitHub

---

# Project Structure

```text
Enterprise-Project-Platform
│
├── backend
│   └── project-platform
│       ├── src
│       ├── pom.xml
│       └── README.md
│
├── docs
│
└── frontend (Planned)
```

---

# Authentication Flow

1. User registers
2. Password is encrypted using BCrypt
3. User logs in
4. JWT token is generated
5. JWT token is sent in Authorization header
6. JWT token is validated
7. Authorized users receive access

---

# Current Status

## Completed Sprints

### ✅ Sprint 1 - Foundation & Security

* User Management
* Authentication
* BCrypt Encryption
* JWT Security
* Protected APIs

### ✅ Sprint 2 - Project Management

* Project Entity
* Project Repository
* Project CRUD APIs

### ✅ Sprint 3 - Task Management

* Task Entity
* Task Repository
* Task CRUD APIs
* Task Assignment
* Priority Management
* Due Dates

### ✅ Sprint 4 - Comments & Collaboration

* Comment Entity
* Comment Repository
* Comment Controller
* Task Comments
* Collaboration Features

### ✅ Sprint 5 - Activity Logs

* Activity Log Entity
* Activity Log Repository
* Activity Log Controller
* Audit Trail
* User Activity Tracking

### ✅ Sprint 6 - Notifications

* Notification Entity
* Notification Repository
* Notification Controller
* User Notifications
* Read/Unread Status
* Notification APIs

### ✅ Sprint 7 - Role-Based Access Control

* ADMIN Role
* MANAGER Role
* EMPLOYEE Role
* Method Security
* Endpoint Authorization
* Project RBAC
* Task RBAC
* Comment RBAC
* Notification RBAC
* Activity Log RBAC

### ✅ Sprint 8 - Dashboard & Reporting

* Dashboard Summary API
* Projects By Status API
* Tasks By Priority API
* User Activity Analytics API
* Executive Metrics API
* Delivery Analytics API

---

## Current Sprint

### 🚧 Sprint 9 - React Frontend

Planned:

* Login Page
* Dashboard Page
* Projects Page
* Tasks Page
* Notifications Page

---

## Upcoming Sprints

📌 AI Copilot

📌 PostgreSQL Migration

📌 Docker Deployment

📌 AWS Deployment

📌 CI/CD Pipeline

📌 Monitoring & Logging

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

---

## Users

POST /api/users

GET /api/users

---

## Projects

POST /api/projects

GET /api/projects

GET /api/projects/{id}

PUT /api/projects/{id}

DELETE /api/projects/{id}

---

## Tasks

POST /api/tasks

GET /api/tasks

GET /api/tasks/{id}

PUT /api/tasks/{id}

DELETE /api/tasks/{id}

---

## Comments

POST /api/comments

GET /api/comments

GET /api/comments/{id}

GET /api/comments/task/{taskId}

DELETE /api/comments/{id}

---

## Activity Logs

POST /api/activity-logs

GET /api/activity-logs

GET /api/activity-logs/{id}

DELETE /api/activity-logs/{id}

---

## Notifications

POST /api/notifications

GET /api/notifications

GET /api/notifications/{id}

GET /api/notifications/user/{email}

PUT /api/notifications/{id}/read

DELETE /api/notifications/{id}

---

## Dashboard

GET /api/dashboard/summary

GET /api/dashboard/projects-by-status

GET /api/dashboard/tasks-by-priority

GET /api/dashboard/user-activity

GET /api/dashboard/executive-metrics

GET /api/dashboard/delivery-analytics

---

# Security

* BCrypt Password Encryption
* JWT Token Generation
* JWT Token Validation
* Role-Based Access Control (RBAC)
* Protected API Endpoints
* Unauthorized Requests Blocked

---

# Documentation

Documentation is available under:

```text
/docs
```

Documents:

* Project Charter
* Business Requirements
* Functional Requirements
* User Stories
* Sprint Plan
* Architecture
* API Specification
* Database Design
* Risk Register
* Deployment Guide
* Product Roadmap
* Daily Task Plan
* Team Onboarding Guide

---

# Running the Application

Clone Repository

```bash
git clone <repository-url>
```

Run Application

```bash
mvnw.cmd spring-boot:run
```

Application URL

```text
http://localhost:8080
```

---

# Version

Current Version:

```text
v1.2
```

---

# Roadmap Progress

✅ Authentication & Security

✅ Project Management

✅ Task Management

✅ Comments & Collaboration

✅ Activity Logs

✅ Notifications

✅ Role-Based Access Control

✅ Dashboard & Reporting

🚧 React Frontend

🚧 AI Copilot

🚧 Deployment & DevOps

---

# Author

Saivishwak Jadala
