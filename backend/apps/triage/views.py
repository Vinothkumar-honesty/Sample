from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import TriageSubmission
from .serializers import TriageSubmitSerializer, TriageSubmissionSerializer


class TriageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TriageSubmissionSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ("ADMIN", "DOCTOR"):
            return TriageSubmission.objects.all()
        return TriageSubmission.objects.filter(patient=user)

    def get_serializer_class(self):
        if self.action == "create":
            return TriageSubmitSerializer
        return TriageSubmissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        output_serializer = TriageSubmissionSerializer(instance)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
