# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Automated Setup (Recommended for Windows)

```bash
setup.bat
```

This will:
- Create Python virtual environment
- Install all dependencies
- Run database migrations
- Create .env files from examples

### Option 2: Manual Setup

#### Step 1: Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at: http://localhost:8000

#### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### Option 3: Docker (Easiest)

```bash
docker-compose up
```

Access:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin

## 📝 First Steps

1. **Create Admin User**
   ```bash
   cd backend
   python manage.py createsuperuser
   ```

2. **Access Admin Panel**
   - Go to http://localhost:8000/admin
   - Login with superuser credentials

3. **Test the Application**
   - Open http://localhost:5173
   - Register a new patient account
   - Try the triage assessment

## 🔧 Development Commands

### Backend
```bash
# Run server
python manage.py runserver

# Run tests
pytest

# Format code
black .
isort .

# Lint code
flake8 .
```

### Frontend
```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database Issues
```bash
cd backend
python manage.py migrate --run-syncdb
```

### Node Modules Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Check [docs/API.md](docs/API.md) for API documentation
- Review [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system overview

## 💡 Tips

- Use `make dev` to start both servers (if Make is installed)
- Check `PROJECT_SUMMARY.md` for complete feature list
- Enable format-on-save in your IDE for better workflow
