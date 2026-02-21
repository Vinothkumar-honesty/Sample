from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Hospital, Bed, BedBooking, Doctor
from .serializers import HospitalSerializer, HospitalListSerializer, BedSerializer, BedBookingSerializer, DoctorSerializer


class HospitalViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Hospital.objects.prefetch_related("beds", "doctors").all()

    def get_serializer_class(self):
        if self.action == "list":
            return HospitalListSerializer
        return HospitalSerializer


class BedViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = BedSerializer
    queryset = Bed.objects.select_related("hospital").all()


class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.select_related("user", "hospital").all()


class BedBookingViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = BedBookingSerializer

    def get_queryset(self):
        return BedBooking.objects.filter(patient=self.request.user).select_related("hospital")

    def list(self, request):
        qs = self.get_queryset().filter(status="ACTIVE")
        data = BedBookingSerializer(qs, many=True).data
        return Response(data)

    def create(self, request):
        hospital_id = request.data.get("hospital_id")
        bed_type = request.data.get("bed_type")
        if not hospital_id or not bed_type:
            return Response({"detail": "hospital_id and bed_type required"}, status=status.HTTP_400_BAD_REQUEST)
        if bed_type not in [c[0] for c in Bed.BedType.choices]:
            return Response({"detail": "Invalid bed_type"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            hospital = Hospital.objects.get(pk=hospital_id)
        except Hospital.DoesNotExist:
            return Response({"detail": "Hospital not found"}, status=status.HTTP_404_NOT_FOUND)
        bed = Bed.objects.filter(hospital=hospital, bed_type=bed_type).first()
        if not bed:
            return Response({"detail": "Bed type not available at this hospital"}, status=status.HTTP_400_BAD_REQUEST)
        if bed.available <= 0:
            return Response({"detail": "No beds available"}, status=status.HTTP_400_BAD_REQUEST)
        booking = BedBooking.objects.create(
            patient=request.user,
            hospital=hospital,
            bed_type=bed_type,
            status="ACTIVE",
        )
        bed.occupied += 1
        bed.save(update_fields=["occupied"])
        return Response(BedBookingSerializer(booking).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        booking = self.get_queryset().filter(pk=pk, status="ACTIVE").first()
        if not booking:
            return Response({"detail": "Booking not found or already cancelled"}, status=status.HTTP_404_NOT_FOUND)
        bed = Bed.objects.filter(hospital=booking.hospital, bed_type=booking.bed_type).first()
        if bed and bed.occupied > 0:
            bed.occupied -= 1
            bed.save(update_fields=["occupied"])
        booking.status = "CANCELLED"
        booking.save(update_fields=["status"])
        return Response({"status": "cancelled"})
