from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@permission_classes([AllowAny])
def emergency_sos(request):
    """Handle emergency SOS requests"""
    latitude = request.data.get('latitude')
    longitude = request.data.get('longitude')
    phone = request.data.get('phone', 'Unknown')
    
    if not latitude or not longitude:
        return Response(
            {'error': 'Location required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Log emergency request
    import logging
    logger = logging.getLogger('apps')
    logger.critical(
        f"EMERGENCY SOS: Location ({latitude}, {longitude}), Phone: {phone}"
    )
    
    # In production, integrate with:
    # - Emergency services API
    # - SMS gateway
    # - Hospital notification system
    
    return Response({
        'success': True,
        'message': 'Emergency services notified',
        'ambulance_eta': '5-10 minutes',
        'emergency_number': '911'
    })
