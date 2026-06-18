## POST /api/auth/login
## POST /api/auth/register
## POST /api/auth/login
## GET /api/users

Request:

{
  "email": "admin@test.com",
  "password": "admin123"
}

Response:

{
  "message": "Login successful",
  "email": "admin@test.com",
  "role": "ADMIN",
  "token": "<JWT_TOKEN>"
}