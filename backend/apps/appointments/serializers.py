from rest_framework import serializers
from apps.hospital.serializers import HospitalListSerializer, DoctorSerializer
from .models import Appointment
from .services import get_queue_position


class AppointmentSerializer(serializers.ModelSerializer):
    hospital_detail = HospitalListSerializer(source="hospital", read_only=True)
    doctor_detail = DoctorSerializer(source="doctor", read_only=True)
    queue_position = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = (
            "id", "hospital", "doctor", "scheduled_at", "status", "notes",
            "created_at", "hospital_detail", "doctor_detail", "queue_position",
        )
        read_only_fields = ("status",)

    def get_queue_position(self, obj):
        if obj.status != Appointment.Status.SCHEDULED:
            return None
        return get_queue_position(obj)


class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ("hospital", "doctor", "scheduled_at", "notes")

    def create(self, validated_data):
        validated_data["patient"] = self.context["request"].user
        return super().create(validated_data)
