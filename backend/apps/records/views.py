from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsAdminOrDoctor
from .models import MedicalReport
from .serializers import MedicalReportSerializer


class MedicalReportViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MedicalReportSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ("ADMIN", "DOCTOR"):
            return MedicalReport.objects.all()
        return MedicalReport.objects.filter(patient=user)

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)
