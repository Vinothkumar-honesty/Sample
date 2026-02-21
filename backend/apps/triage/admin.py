from django.contrib import admin
from .models import TriageSubmission


@admin.register(TriageSubmission)
class TriageSubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "patient", "urgency", "score", "created_at")
    list_filter = ("urgency",)
