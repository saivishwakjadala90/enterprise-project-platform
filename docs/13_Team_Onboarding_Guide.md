# Team Onboarding Guide

## Project Overview

Enterprise AI Delivery Operating System is a platform designed to manage projects, tasks, teams, reporting, notifications, security, and AI-powered delivery insights.

---

## Current Project Status

### Version

v1.1

### Completed Modules

* User Management
* Authentication
* JWT Security
* Role-Based Access Control
* Project Management
* Task Management
* Comments & Collaboration
* Activity Logs
* Notifications
* Dashboard Summary API
* Projects By Status API
* Tasks By Priority API

### Current Sprint

🚧 Dashboard & Reporting

### Current Task

* User Activity Analytics

---

## Technology Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication

### Database

* H2 Database (Development)
* PostgreSQL (Future)

### Frontend

* React
* JavaScript
* HTML
* CSS

### DevOps

* Docker
* AWS
* GitHub Actions
* CI/CD

---

## Security Model

### Roles

#### ADMIN

Can:

* Manage Users
* Manage Projects
* Manage Tasks
* Manage Notifications
* View Activity Logs
* Access Dashboard APIs

#### MANAGER

Can:

* Create Projects
* Create Tasks
* Manage Team Work
* Create Notifications
* Access Dashboard APIs

#### EMPLOYEE

Can:

* View Projects
* View Tasks
* Create Comments
* View Personal Notifications

---

## Authentication

* JWT Token Authentication
* BCrypt Password Encryption
* Role-Based Access Control (RBAC)
* Spring Security Method Authorization

---

## Development Workflow

### Step 1

Clone Repository

```bash
git clone <repository-url>
```

### Step 2

Run Application

```bash
mvnw.cmd spring-boot:run
```

### Step 3

Read Documentation

* Product Roadmap
* Daily Task Plan
* API Specification
* Architecture

---

## Team Structure

### Product Owner

Responsibilities:

* Product Direction
* Sprint Planning
* Architecture Decisions

### Backend Team

Responsibilities:

* APIs
* Security
* Database
* Dashboard Services

### Frontend Team

Responsibilities:

* React UI
* Dashboard Screens
* User Experience

### QA Team

Responsibilities:

* API Testing
* UI Testing
* Bug Tracking

### DevOps Team

Responsibilities:

* Deployment
* Monitoring
* CI/CD

### AI Team

Responsibilities:

* AI Copilot
* Risk Detection
* Sprint Summaries
* Delivery Insights

---

## Current APIs

### Authentication

* Register
* Login

### Users

* User Management APIs

### Projects

* CRUD APIs

### Tasks

* CRUD APIs

### Comments

* Collaboration APIs

### Activity Logs

* Audit Trail APIs

### Notifications

* Notification APIs

### Dashboard

* Summary API
* Projects By Status API
* Tasks By Priority API

---

## Coding Standards

* Use meaningful class names
* Follow layered architecture
* Keep controllers lightweight
* Use service-oriented design
* Document APIs
* Update roadmap after sprint completion
* Commit code daily

---

## Upcoming Work

### Dashboard Sprint

* User Activity Analytics
* Executive Dashboard Metrics
* Delivery Analytics

### Future Sprints

* React Frontend
* AI Copilot
* PostgreSQL Migration
* Docker
* AWS
* CI/CD

---

## Author

Saivishwak Jadala
