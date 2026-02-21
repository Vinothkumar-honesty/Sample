"""
Custom user model with roles: ADMIN, DOCTOR, PATIENT.
"""
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        DOCTOR = "DOCTOR", "Doctor"
        PATIENT = "PATIENT", "Patient"

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.PATIENT)
    phone = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def is_admin(self):
        return self.role == self.Role.ADMIN

    def is_doctor(self):
        return self.role == self.Role.DOCTOR

    def is_patient(self):
        return self.role == self.Role.PATIENT
