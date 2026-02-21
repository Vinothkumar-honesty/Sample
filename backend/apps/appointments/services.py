"""
Queue position calculation for appointments.
"""
from django.utils import timezone
from .models import Appointment


def get_queue_position(appointment: Appointment) -> int:
    """1-based queue position for same hospital on same day, only SCHEDULED."""
    day_start = appointment.scheduled_at.replace(hour=0, minute=0, second=0, microsecond=0)
    day_end = day_start + timezone.timedelta(days=1)
    same_slot = Appointment.objects.filter(
        hospital=appointment.hospital,
        scheduled_at__gte=day_start,
        scheduled_at__lt=day_end,
        status=Appointment.Status.SCHEDULED,
        scheduled_at__lte=appointment.scheduled_at,
    ).order_by("scheduled_at", "created_at")
    positions = list(same_slot.values_list("id", flat=True))
    try:
        return positions.index(appointment.id) + 1
    except ValueError:
        return 0
