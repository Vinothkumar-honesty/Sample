"""
Medical report upload and patient history.
"""
from django.db import models
from django.conf import settings


class MedicalReport(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="medical_reports")
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to="reports/%Y/%m/", blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
