"""
Hospital, Bed, and Doctor models.
"""
from django.db import models
from django.conf import settings


class Hospital(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Bed(models.Model):
    class BedType(models.TextChoices):
        ICU = "ICU", "ICU"
        OXYGEN = "OXYGEN", "Oxygen"
        GENERAL = "GENERAL", "General"

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="beds")
    bed_type = models.CharField(max_length=10, choices=BedType.choices)
    total = models.PositiveIntegerField(default=0)
    occupied = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = [("hospital", "bed_type")]

    @property
    def available(self):
        return max(0, self.total - self.occupied)


class BedBooking(models.Model):
    """Patient registers for a bed; decreases available count until cancelled."""
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bed_bookings")
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="bed_bookings")
    bed_type = models.CharField(max_length=10, choices=Bed.BedType.choices)
    status = models.CharField(max_length=10, choices=[("ACTIVE", "Active"), ("CANCELLED", "Cancelled")], default="ACTIVE")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="doctor_profile")
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="doctors", null=True, blank=True)
    specialization = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return str(self.user.get_full_name() or self.user.username)
