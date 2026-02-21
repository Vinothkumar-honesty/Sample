"""
Simple surge prediction from past records (mock-friendly).
Returns surge prediction percentage.
"""
from django.utils import timezone
from datetime import timedelta
from .models import DailyVisitRecord


def get_surge_prediction_percentage(days_ahead: int = 1) -> float:
    """
    Simple logic: average of last 7 days vs previous 7 days trend.
    Returns percentage change (e.g. 15.5 = 15.5% expected surge).
    """
    today = timezone.now().date()
    recent = list(
        DailyVisitRecord.objects.filter(date__lte=today).order_by("-date")[:7].values_list("visit_count", flat=True)
    )
    older = list(
        DailyVisitRecord.objects.filter(date__lt=today - timedelta(days=7)).order_by("-date")[:7].values_list("visit_count", flat=True)
    )
    if not recent:
        recent = [50, 55, 48, 62, 58, 52, 60]  # mock default
    if not older:
        older = [45, 48, 42, 50, 48, 45, 52]
    avg_recent = sum(recent) / len(recent) if recent else 50
    avg_older = sum(older) / len(older) if older else 45
    if avg_older == 0:
        return 0.0
    change = ((avg_recent - avg_older) / avg_older) * 100
    # Scale by days_ahead (slightly more uncertainty)
    return round(change * (1 + 0.1 * max(0, days_ahead - 1)), 1)
