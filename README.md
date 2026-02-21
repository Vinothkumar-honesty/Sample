# MedTrack AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Django](https://img.shields.io/badge/django-4.2+-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/react-18.2-blue.svg)](https://reactjs.org/)

Healthcare management platform with AI-powered triage, bed availability, appointments, and surge prediction.

## ✨ Features

- **Patient Dashboard** – View triage assessments, appointments, and surge predictions
- **AI-Powered Triage** – Symptom-based assessment with clinical terminology and department suggestions
- **Bed Availability** – Real-time bed status with patient registration (count decreases when a bed is booked)
- **Hospital Finder** – Locate nearby facilities
- **Appointment Booking** – Schedule and manage visits
- **Reports** – Medical reports viewer
- **Admin Panel** – Administrative controls

## Tech Stack

- **Frontend:** React 18, Vite, React Router, Axios
- **Backend:** Django 4.2+, Django REST Framework, JWT auth

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 15+ (optional, SQLite by default)

### Automated Setup (Windows)

```bash
setup.bat
```

### Manual Setup

#### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment

Create `backend/.env` and `frontend/.env` from examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update with your configuration.

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
pytest --cov=apps --cov-report=html
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## 🔧 Development Tools

### Code Quality

**Backend:**
```bash
black .              # Format code
isort .              # Sort imports
flake8 .             # Lint code
```

**Frontend:**
```bash
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run format       # Format code
```

## 🐳 Docker

### Development
```bash
docker-compose up
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Project Structure

```
MEDTRACK AI/
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── api/
├── backend/           # Django REST API
│   └── apps/
│       ├── users/
│       ├── triage/
│       ├── hospital/
│       ├── appointments/
│       ├── prediction/
│       └── records/
└── README.md
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📧 Support

For issues and questions, please open an issue on the repository.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for security policy and reporting vulnerabilities.

---

**MedTrack AI** - Professional Healthcare Management Platform
