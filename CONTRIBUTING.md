# Contributing to MedTrack AI

Thank you for your interest in contributing to MedTrack AI!

## Development Setup

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL (optional, SQLite by default)

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Code Standards

### Backend (Python/Django)
- Follow PEP 8 style guide
- Use Black for formatting: `black .`
- Use isort for imports: `isort .`
- Run flake8 for linting: `flake8 .`
- Write tests with pytest
- Maintain 80%+ code coverage

### Frontend (React)
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful component names
- Keep components small and focused
- Write tests for critical functionality

## Testing

### Backend
```bash
cd backend
pytest
pytest --cov=apps --cov-report=html
```

### Frontend
```bash
cd frontend
npm test
npm run test:coverage
```

## Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes with clear commit messages
3. Ensure all tests pass
4. Update documentation as needed
5. Submit PR with detailed description

## Code Review

All submissions require review. We use pull requests for this purpose.

## Questions?

Open an issue for discussion before starting major changes.
