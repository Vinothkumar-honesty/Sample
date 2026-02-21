"""
Mock/simple surge prediction data.
"""
from django.db import models


class DailyVisitRecord(models.Model):
    """Mock past records for surge prediction."""
    date = models.DateField(unique=True)
    visit_count = models.PositiveIntegerField(default=0)
    emergency_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-date"]
