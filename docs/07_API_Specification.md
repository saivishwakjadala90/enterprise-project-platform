## POST /api/auth/login

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