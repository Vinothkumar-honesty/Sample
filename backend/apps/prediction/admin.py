from django.contrib import admin
from .models import DailyVisitRecord


@admin.register(DailyVisitRecord)
class DailyVisitRecordAdmin(admin.ModelAdmin):
    list_display = ("date", "visit_count", "emergency_count")
