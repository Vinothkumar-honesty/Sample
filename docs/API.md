# API Documentation

Base URL: `http://localhost:8000/api`

## Authentication

All endpoints except registration and login require JWT authentication.

**Headers:**
```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /users/register/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "patient"
}
```

**Response:** `201 Created`

#### Login
```http
POST /users/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**Response:** `200 OK`

### Triage

#### Submit Triage Assessment
```http
POST /triage/assessments/
Authorization: Bearer <token>
```

### Hospital

#### List Hospitals
```http
GET /hospital/hospitals/
Authorization: Bearer <token>
```

### Appointments

#### Create Appointment
```http
POST /appointments/
Authorization: Bearer <token>
```

### Prediction

#### Get Surge Predictions
```http
GET /prediction/surge/
Authorization: Bearer <token>
```

## Error Responses

- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 500 Internal Server Error

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per user
