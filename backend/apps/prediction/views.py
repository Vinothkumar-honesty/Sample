from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import get_surge_prediction_percentage


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def surge_prediction(request):
    days_ahead = int(request.query_params.get("days_ahead", 1))
    if days_ahead < 1:
        days_ahead = 1
    if days_ahead > 14:
        days_ahead = 14
    percentage = get_surge_prediction_percentage(days_ahead)
    return Response({"surge_prediction_percentage": percentage, "days_ahead": days_ahead})
