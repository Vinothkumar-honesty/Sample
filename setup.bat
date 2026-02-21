@echo off
echo ========================================
echo MedTrack AI - Development Setup
echo ========================================
echo.

echo [1/4] Setting up backend...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing backend dependencies...
pip install -r requirements.txt -r requirements-dev.txt
echo Running migrations...
python manage.py migrate
cd ..

echo.
echo [2/4] Setting up frontend...
cd frontend
echo Installing frontend dependencies...
call npm install
cd ..

echo.
echo [3/4] Creating environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env - Please update with your settings
)
if not exist frontend\.env (
    copy frontend\.env.example frontend\.env
    echo Created frontend\.env - Please update with your settings
)

echo.
echo [4/4] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Update backend\.env with your settings
echo 2. Update frontend\.env with your settings
echo 3. Run: make dev (or manually start servers)
echo.
echo Backend: cd backend ^&^& venv\Scripts\activate ^&^& python manage.py runserver
echo Frontend: cd frontend ^&^& npm run dev
echo.
pause
