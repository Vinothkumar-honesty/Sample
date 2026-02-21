import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user_data():
    return {
        "email": "test@example.com",
        "password": "testpass123",
        "first_name": "Test",
        "last_name": "User",
    }


@pytest.mark.django_db
class TestUserRegistration:
    def test_create_user(self, api_client, user_data):
        response = api_client.post("/api/users/register/", user_data)
        assert response.status_code == 201
        assert User.objects.filter(email=user_data["email"]).exists()

    def test_duplicate_email(self, api_client, user_data):
        User.objects.create_user(**user_data)
        response = api_client.post("/api/users/register/", user_data)
        assert response.status_code == 400


@pytest.mark.django_db
class TestUserAuthentication:
    def test_login_success(self, api_client, user_data):
        User.objects.create_user(**user_data)
        response = api_client.post(
            "/api/users/login/",
            {"email": user_data["email"], "password": user_data["password"]},
        )
        assert response.status_code == 200
        assert "access" in response.data
        assert "refresh" in response.data

    def test_login_invalid_credentials(self, api_client):
        response = api_client.post(
            "/api/users/login/",
            {"email": "wrong@example.com", "password": "wrongpass"},
        )
        assert response.status_code == 401
