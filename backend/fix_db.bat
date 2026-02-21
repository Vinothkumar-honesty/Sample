@echo off
echo Fixing database...
timeout /t 2 /nobreak >nul
del /f db.sqlite3 2>nul
echo.
echo Creating migrations...
python manage.py makemigrations users
python manage.py makemigrations triage
python manage.py makemigrations hospital
python manage.py makemigrations appointments
python manage.py makemigrations prediction
python manage.py makemigrations records
echo.
echo Running migrations...
python manage.py migrate
echo.
echo Done! Now run: python manage.py createsuperuser
pause
