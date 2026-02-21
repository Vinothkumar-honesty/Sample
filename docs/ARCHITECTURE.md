# Architecture Overview

## System Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│  Database   │
│  React/Vite │      │   Django    │      │ PostgreSQL  │
└─────────────┘      └─────────────┘      └─────────────┘
```

## Technology Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** Context API

### Backend
- **Framework:** Django 4.2+
- **API:** Django REST Framework
- **Authentication:** JWT (Simple JWT)
- **Database:** PostgreSQL / SQLite
- **CORS:** django-cors-headers

## Application Structure

### Backend Apps

1. **users** - User management and authentication
2. **triage** - AI-powered triage assessments
3. **hospital** - Hospital and bed management
4. **appointments** - Appointment scheduling
5. **prediction** - Surge prediction analytics
6. **records** - Medical records management

### Frontend Structure

```
src/
├── api/           # API client and endpoints
├── components/    # Reusable components
├── context/       # Context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── styles/        # Global styles
└── utils/         # Utility functions
```

## Data Flow

1. User interacts with React frontend
2. Frontend makes API request via Axios
3. Django REST Framework processes request
4. Business logic executed in views
5. Data persisted to PostgreSQL
6. Response sent back to frontend
7. UI updates with new data

## Security

- JWT token-based authentication
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

## Scalability Considerations

- Stateless API design
- Database connection pooling
- Caching strategy (Redis)
- Load balancing ready
- Horizontal scaling support
