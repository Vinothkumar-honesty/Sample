"""
Seed demo hospitals and beds. Run: python manage.py seed_hospitals
"""
from django.core.management.base import BaseCommand
from apps.hospital.models import Hospital, Bed


class Command(BaseCommand):
    help = "Create demo hospitals with beds"

    def handle(self, *args, **options):
        data = [
            ("City General", "123 Main St", "555-0100", [(Bed.BedType.ICU, 10, 3), (Bed.BedType.OXYGEN, 20, 5), (Bed.BedType.GENERAL, 50, 12)]),
            ("Riverside Medical", "456 River Rd", "555-0200", [(Bed.BedType.ICU, 8, 2), (Bed.BedType.OXYGEN, 15, 4), (Bed.BedType.GENERAL, 40, 8)]),
        ]
        for name, address, phone, beds in data:
            h, _ = Hospital.objects.get_or_create(name=name, defaults={"address": address, "phone": phone})
            for bed_type, total, occupied in beds:
                Bed.objects.update_or_create(
                    hospital=h, bed_type=bed_type,
                    defaults={"total": total, "occupied": occupied},
                )
            self.stdout.write(self.style.SUCCESS(f"OK: {h.name}"))
        self.stdout.write(self.style.SUCCESS("Done."))
