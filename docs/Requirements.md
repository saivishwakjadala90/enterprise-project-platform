## Authentication Requirements

- Users can login using email and password
- Passwords are encrypted using BCrypt
- JWT token is generated after successful login
- JWT token will be required to access protected APIs
- Roles supported:
  - ADMIN
  - MANAGER
  - EMPLOYEE