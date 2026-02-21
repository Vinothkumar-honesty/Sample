# MediFlow AI - Terminal Commands to Run

## ✅ Issues Fixed:
1. Added `perform_create` to MedicalReport ViewSet
2. Added TEMPLATES configuration in settings.py
3. Added media URL serving in urls.py
4. Created .env files from examples

---

## 🚀 Backend Setup & Run (Django)

### Step 1: Navigate to backend
```bash
cd "c:\Users\admin\Desktop\MEDTRACK AI\backend"
```

### Step 2: Create virtual environment
```bash
python -m venv venv
```

### Step 3: Activate virtual environment
```bash
venv\Scripts\activate
```

### Step 4: Install dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Run migrations
```bash
python manage.py migrate
```

### Step 6: Create superuser (admin)
```bash
python manage.py createsuperuser
```
- Enter username, email, and password
- After creation, login to admin panel and set role to ADMIN

### Step 7: Seed demo data (optional)
```bash
python manage.py seed_hospitals
python manage.py seed_visits
```

### Step 8: Run backend server
```bash
python manage.py runserver
```
✅ Backend running at: **http://localhost:8000**
✅ Admin panel: **http://localhost:8000/admin**
✅ API: **http://localhost:8000/api/**

---

## 🎨 Frontend Setup & Run (React Vite)

### Open NEW terminal and navigate to frontend
```bash
cd "c:\Users\admin\Desktop\MEDTRACK AI\frontend"
```

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Run frontend dev server
```bash
npm run dev
```
✅ Frontend running at: **http://localhost:5173**

---

## 📝 Quick Start (All-in-One)

### Terminal 1 - Backend:
```bash
cd "c:\Users\admin\Desktop\MEDTRACK AI\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_hospitals
python manage.py seed_visits
python manage.py runserver
```

### Terminal 2 - Frontend:
```bash
cd "c:\Users\admin\Desktop\MEDTRACK AI\frontend"
npm install
npm run dev
```

---

## 🧪 Test Workflow

1. **Register**: http://localhost:5173/register → Create PATIENT account
2. **Login**: Sign in with credentials
3. **Triage**: Select symptoms → Get urgency level
4. **Hospitals**: View bed availability
5. **Appointments**: Book appointment → See queue position
6. **Reports**: View medical reports
7. **Admin**: Login as ADMIN user → Access admin dashboard

---

## 🔧 Troubleshooting

### Backend Issues:
- **Port 8000 in use**: `python manage.py runserver 8001`
- **Migration errors**: `python manage.py migrate --run-syncdb`
- **Missing packages**: `pip install -r requirements.txt --upgrade`

### Frontend Issues:
- **Port 5173 in use**: Edit `vite.config.js` → change port
- **Module errors**: `npm install --force`
- **API connection**: Check `.env` → `VITE_API_URL=http://localhost:8000/api`

---

## 📦 Environment Variables

### Backend (.env):
```
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env):
```
VITE_API_URL=http://localhost:8000/api
```

---

## 🎯 Default Credentials (after createsuperuser)
- Username: (your choice)
- Password: (your choice)
- Role: Set to ADMIN in Django admin panel

---

## 📊 API Endpoints
See `API_ENDPOINTS.md` for complete API documentation.

Base URL: `http://localhost:8000/api`
