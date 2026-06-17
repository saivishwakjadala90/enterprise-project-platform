# Project Platform

A Spring Boot based Project Management Platform with JWT Authentication and Role-Based Access Control.

## Features

- User Registration
- User Login
- BCrypt Password Encryption
- JWT Authentication
- Protected REST APIs
- Role-Based Access Control
- MySQL Database Integration
- API Testing using Postman

---

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT

### Database
- MySQL

### Tools
- Maven
- IntelliJ IDEA
- Postman
- Git & GitHub

---

## Project Structure

```
project-platform
│
├── src
│   ├── controller
│   ├── entity
│   ├── repository
│   ├── security
│   └── config
│
├── docs
│
├── pom.xml
└── README.md
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

### Register User

POST

```
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

### Login

POST

```
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

### Get Users

GET

```
/api/users
```

Header

```
Authorization: Bearer JWT_TOKEN
```

---

## Security

- BCrypt Password Encryption
- JWT Token Validation
- Protected API Endpoints
- Unauthorized Requests Blocked

---

## Documentation

Project documents are available in the `/docs` folder:

- Project Charter
- Business Requirements
- Functional Requirements
- User Stories
- Sprint Plan
- Architecture
- API Specification
- Database Design
- Risk Register
- Deployment Guide

---

## Running the Application

Clone the repository

```bash
git clone <repository-url>
```

Run the application

```bash
mvn spring-boot:run
```

Application URL

```
http://localhost:8080
```

---

## Current Status

✅ User Management

✅ Authentication & Security

✅ JWT Token Generation

✅ Protected APIs

✅ Documentation Complete

🚧 Project Management Module (Upcoming)

🚧 Task Management Module (Upcoming)

🚧 Dashboard & Reporting (Upcoming)