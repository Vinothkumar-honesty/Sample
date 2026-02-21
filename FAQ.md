# Frequently Asked Questions (FAQ)

## General

### What is MedTrack AI?
MedTrack AI is a professional healthcare management platform featuring AI-powered triage, real-time bed availability tracking, appointment scheduling, and surge prediction analytics.

### What technologies does it use?
- **Frontend:** React 18, Vite, React Router
- **Backend:** Django 4.2+, Django REST Framework
- **Database:** PostgreSQL (production) / SQLite (development)
- **Authentication:** JWT tokens

## Setup & Installation

### How do I set up the project?
Run `setup.bat` for automated setup on Windows, or follow the manual steps in [QUICKSTART.md](QUICKSTART.md).

### Do I need Docker?
No, Docker is optional. You can run the project with Python and Node.js directly.

### What Python version is required?
Python 3.11 or higher is required.

### What Node.js version is required?
Node.js 20 or higher is recommended.

## Development

### How do I run tests?
**Backend:** `cd backend && pytest`
**Frontend:** `cd frontend && npm test`

### How do I format my code?
**Backend:** `black . && isort .`
**Frontend:** `npm run format`

### How do I check code quality?
**Backend:** `flake8 .`
**Frontend:** `npm run lint`

### Where are the logs stored?
Backend logs are stored in `backend/logs/medtrack.log`

## Features

### How does the AI triage work?
The triage system analyzes patient symptoms and provides severity assessment, recommended department, and priority level.

### How is bed availability tracked?
Real-time bed counts are maintained in the database. When a patient is registered to a bed, the available count decreases automatically.

### Can I customize the appointment slots?
Yes, appointment scheduling can be configured in the appointments app settings.

## Deployment

### How do I deploy to production?
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for comprehensive deployment instructions.

### What environment variables are required?
Check `.env.example` files in both backend and frontend directories.

### Should I use SQLite in production?
No, use PostgreSQL for production deployments.

### How do I enable HTTPS?
Configure SSL certificates and update Django settings. See deployment guide for details.

## Troubleshooting

### Port 8000 is already in use
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database migration errors
```bash
python manage.py migrate --run-syncdb
```

### CORS errors in frontend
Check `CORS_ORIGINS` in backend `.env` file matches your frontend URL.

### JWT token expired
Tokens expire after 60 minutes. Implement token refresh in your frontend.

## Contributing

### How can I contribute?
Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to the project.

### What's the code review process?
All changes require pull request review before merging.

### Are there coding standards?
Yes, we use Black, isort, Flake8 for Python and ESLint, Prettier for JavaScript.

## Security

### How do I report a security vulnerability?
See [SECURITY.md](SECURITY.md) for our security policy and reporting process.

### Is the application secure?
The application follows security best practices including JWT authentication, input validation, and HTTPS support.

### How are passwords stored?
Passwords are hashed using Django's built-in password hashing (PBKDF2).

## Support

### Where can I get help?
Open an issue on the repository with your question or problem.

### Is there a community?
Check the repository discussions for community support.

### Can I use this commercially?
Yes, the project is licensed under MIT License. See [LICENSE](LICENSE) for details.
