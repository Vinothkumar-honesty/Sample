"""
Triage: symptom submission and urgency scoring with patient details.
"""
from django.db import models
from django.conf import settings


class TriageSubmission(models.Model):
    class Urgency(models.TextChoices):
        LOW = "LOW", "Low (Home care)"
        MEDIUM = "MEDIUM", "Medium (Clinic)"
        HIGH = "HIGH", "High (Emergency)"

    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="triage_submissions")
    patient_name = models.CharField(max_length=200, default="Unknown", help_text="Patient full name")
    patient_age = models.PositiveSmallIntegerField(default=0, help_text="Patient age")
    patient_gender = models.CharField(max_length=20, blank=True, default="", choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")])
    contact_number = models.CharField(max_length=20, blank=True, default="")
    symptoms = models.JSONField(help_text="List of symptom codes or descriptions")
    notes = models.TextField(blank=True)
    urgency = models.CharField(max_length=10, choices=Urgency.choices)
    score = models.PositiveSmallIntegerField(default=0, help_text="Numeric urgency score 0-100")
    clinical_terminology = models.TextField(blank=True, default="", help_text="Medical terminology for symptoms")
    suggested_department = models.CharField(max_length=100, blank=True, default="")
    ai_summary = models.TextField(blank=True, default="", help_text="AI-generated summary for doctors")
    status = models.CharField(max_length=20, default="waiting", choices=[
        ("waiting", "Waiting"),
        ("in_progress", "In Progress"),
        ("completed", "Completed")
    ])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
