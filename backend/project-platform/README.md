# Enterprise AI Delivery Operating System

A Spring Boot based Enterprise Project Management Platform with JWT Authentication, Task Management, Project Management, and AI-powered delivery insights.

## Features

### Completed Features

* User Registration
* User Login
* BCrypt Password Encryption
* JWT Authentication
* JWT Authorization
* Protected REST APIs
* Project Management CRUD APIs
* Task Management CRUD APIs
* API Testing using Postman
* Documentation Suite
* GitHub Integration

---

## Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT

### Database

* H2 Database (Development)
* PostgreSQL (Planned)

### Tools

* Maven
* IntelliJ IDEA
* Postman
* Git
* GitHub

---

## Project Structure

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

## Authentication Flow

1. User registers
2. Password is encrypted using BCrypt
3. User logs in
4. JWT token is generated
5. JWT token is sent in Authorization header
6. Protected APIs validate the JWT token
7. Authorized users receive access

---

## API Endpoints

### Authentication

#### Register User

POST

```text
/api/auth/register
```

Request Body

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

---

#### Login

POST

```text
/api/auth/login
```

Request Body

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
  "token": "JWT_TOKEN"
}
```

---

### Users

#### Get All Users

GET

```text
/api/users
```

Header

```text
Authorization: Bearer JWT_TOKEN
```

---

### Projects

#### Create Project

POST

```text
/api/projects
```

#### Get All Projects

GET

```text
/api/projects
```

#### Get Project By Id

GET

```text
/api/projects/{id}
```

#### Update Project

PUT

```text
/api/projects/{id}
```

#### Delete Project

DELETE

```text
/api/projects/{id}
```

---

### Tasks

#### Create Task

POST

```text
/api/tasks
```

#### Get All Tasks

GET

```text
/api/tasks
```

#### Get Task By Id

GET

```text
/api/tasks/{id}
```

#### Update Task

PUT

```text
/api/tasks/{id}
```

#### Delete Task

DELETE

```text
/api/tasks/{id}
```

---

## Security

* BCrypt Password Encryption
* JWT Token Generation
* JWT Token Validation
* Protected Endpoints
* Unauthorized Request Blocking

---

## Documentation

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

## Running the Application

Clone Repository

```bash
git clone <repository-url>
```

Run Application

```bash
mvn spring-boot:run
```

Application URL

```text
http://localhost:8080
```

---

## Current Status

### Completed Sprints

✅ Sprint 1 - Foundation & Security

* User Management
* Authentication
* BCrypt Encryption
* JWT Security
* Protected APIs

✅ Sprint 2 - Project Management

* Project Entity
* Project Repository
* Project CRUD APIs

✅ Sprint 3 - Task Management

* Task Entity
* Task Repository
* Task CRUD APIs

---

### Current Sprint

🚧 Sprint 7 - Comments & Collaboration Module

Planned:

* Task Comments
* Project Discussions
* Collaboration Features

---

### Upcoming Sprints

📌 Activity Logs

📌 Notifications

📌 Dashboard & Reporting

📌 Role-Based Access Control

📌 React Frontend

📌 AI Copilot

📌 Docker Deployment

📌 AWS Deployment

📌 CI/CD Pipeline

---

## Version

Current Version:

```text
v0.6
```

---

## Author

Saivishwak Jadala
