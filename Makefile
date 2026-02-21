.PHONY: help install dev test lint format clean docker-up docker-down

help:
	@echo "MedTrack AI - Available Commands"
	@echo "================================="
	@echo "install       - Install all dependencies"
	@echo "dev           - Run development servers"
	@echo "test          - Run all tests"
	@echo "lint          - Run linters"
	@echo "format        - Format code"
	@echo "clean         - Clean build artifacts"
	@echo "docker-up     - Start Docker containers"
	@echo "docker-down   - Stop Docker containers"

install:
	cd backend && pip install -r requirements.txt -r requirements-dev.txt
	cd frontend && npm install

dev:
	@echo "Starting backend and frontend..."
	start cmd /k "cd backend && venv\\Scripts\\activate && python manage.py runserver"
	start cmd /k "cd frontend && npm run dev"

test:
	cd backend && pytest
	cd frontend && npm test

lint:
	cd backend && flake8 . && black --check . && isort --check-only .
	cd frontend && npm run lint

format:
	cd backend && black . && isort .
	cd frontend && npm run format

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	cd frontend && rm -rf node_modules dist

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down
