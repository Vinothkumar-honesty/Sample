"""
Seed mock visit records for surge prediction. Run: python manage.py seed_visits
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
import random
from apps.prediction.models import DailyVisitRecord


class Command(BaseCommand):
    help = "Create mock daily visit records"

    def handle(self, *args, **options):
        today = timezone.now().date()
        for i in range(14):
            d = today - timedelta(days=i)
            base = 45 + random.randint(0, 25)
            emergency = random.randint(2, 10)
            DailyVisitRecord.objects.update_or_create(
                date=d,
                defaults={"visit_count": base, "emergency_count": emergency},
            )
        self.stdout.write(self.style.SUCCESS("Done. 14 days of mock visits created."))
