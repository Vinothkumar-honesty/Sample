from rest_framework import serializers
from .models import Hospital, Bed, BedBooking, Doctor


class BedSerializer(serializers.ModelSerializer):
    available = serializers.ReadOnlyField()

    class Meta:
        model = Bed
        fields = ("id", "bed_type", "total", "occupied", "available")


class DoctorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = ("id", "name", "specialization", "hospital")

    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.username


class HospitalSerializer(serializers.ModelSerializer):
    beds = BedSerializer(many=True, read_only=True)
    doctors = DoctorSerializer(many=True, read_only=True)

    class Meta:
        model = Hospital
        fields = ("id", "name", "address", "phone", "beds", "doctors")


class BedBookingSerializer(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source="hospital.name", read_only=True)

    class Meta:
        model = BedBooking
        fields = ("id", "hospital", "hospital_name", "bed_type", "status", "created_at")


class HospitalListSerializer(serializers.ModelSerializer):
    bed_summary = serializers.SerializerMethodField()

    class Meta:
        model = Hospital
        fields = ("id", "name", "address", "phone", "bed_summary")

    def get_bed_summary(self, obj):
        return {b.bed_type: {"total": b.total, "occupied": b.occupied, "available": b.available} for b in obj.beds.all()}
