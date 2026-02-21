from rest_framework import serializers
from .models import MedicalReport


class MedicalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalReport
        fields = ("id", "title", "file", "notes", "created_at")
        read_only_fields = ("created_at",)
