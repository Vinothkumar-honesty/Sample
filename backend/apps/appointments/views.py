from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsAdminOrDoctor
from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentCreateSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ("ADMIN", "DOCTOR"):
            return Appointment.objects.select_related("hospital", "doctor", "patient").all()
        return Appointment.objects.filter(patient=user).select_related("hospital", "doctor")

    def get_serializer_class(self):
        if self.action == "create":
            return AppointmentCreateSerializer
        return AppointmentSerializer

    def perform_destroy(self, instance):
        instance.status = Appointment.Status.CANCELLED
        instance.save()

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        if appointment.patient != request.user and request.user.role not in ("ADMIN", "DOCTOR"):
            return Response({"detail": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)
        appointment.status = Appointment.Status.CANCELLED
        appointment.save()
        return Response({"status": "cancelled"})
