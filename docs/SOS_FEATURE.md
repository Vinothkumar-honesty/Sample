# Emergency SOS Feature

## Overview
The SOS button allows patients in critical emergency situations to immediately call for an ambulance without needing to log in.

## Features

### Frontend (Login Page)
- **Prominent SOS Button** - Red pulsing button in top-left corner
- **Geolocation** - Automatically captures user's location
- **No Authentication Required** - Works without login
- **Visual Feedback** - Loading state and success notifications
- **Emergency Alert** - Shows ambulance ETA and emergency number

### Backend API
- **Endpoint:** `POST /api/hospital/sos/`
- **Permission:** Public (no authentication required)
- **Logging:** Critical-level logs for emergency tracking

## How It Works

1. **User clicks SOS button** on login page
2. **Browser requests location permission**
3. **Geolocation captured** (latitude, longitude)
4. **API call sent** to backend with location
5. **Emergency logged** in system
6. **User notified** with ambulance ETA
7. **Emergency services contacted** (in production)

## API Request

```javascript
POST /api/hospital/sos/
Content-Type: application/json

{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "phone": "+1234567890" // optional
}
```

## API Response

```json
{
  "success": true,
  "message": "Emergency services notified",
  "ambulance_eta": "5-10 minutes",
  "emergency_number": "911"
}
```

## Production Integration

For production deployment, integrate with:

### 1. Emergency Services API
```python
# In emergency.py
import requests

def notify_emergency_services(latitude, longitude):
    response = requests.post(
        'https://emergency-api.example.com/dispatch',
        json={
            'location': {'lat': latitude, 'lng': longitude},
            'type': 'medical',
            'priority': 'critical'
        },
        headers={'Authorization': f'Bearer {EMERGENCY_API_KEY}'}
    )
    return response.json()
```

### 2. SMS Gateway (Twilio)
```python
from twilio.rest import Client

def send_sms_alert(phone, location):
    client = Client(TWILIO_SID, TWILIO_TOKEN)
    message = client.messages.create(
        body=f'Emergency SOS at {location}. Help dispatched.',
        from_=TWILIO_PHONE,
        to=phone
    )
```

### 3. Hospital Notification System
```python
def notify_nearby_hospitals(latitude, longitude):
    # Find hospitals within 10km radius
    nearby_hospitals = Hospital.objects.filter(
        location__distance_lte=(
            Point(longitude, latitude),
            D(km=10)
        )
    )
    
    # Send notifications
    for hospital in nearby_hospitals:
        send_hospital_alert(hospital, latitude, longitude)
```

### 4. Real-time Tracking
```python
# WebSocket for real-time ambulance tracking
from channels.layers import get_channel_layer

async def track_ambulance(sos_id, ambulance_id):
    channel_layer = get_channel_layer()
    await channel_layer.group_send(
        f'sos_{sos_id}',
        {
            'type': 'ambulance_location',
            'ambulance_id': ambulance_id,
            'location': get_ambulance_location(ambulance_id)
        }
    )
```

## Security Considerations

1. **Rate Limiting** - Prevent abuse
2. **Location Validation** - Verify coordinates are valid
3. **Logging** - Track all SOS requests
4. **Privacy** - Handle location data securely
5. **False Alarm Detection** - Monitor for misuse

## Testing

### Frontend Test
```javascript
// Test SOS button click
const sosButton = screen.getByText('SOS');
fireEvent.click(sosButton);
expect(mockGeolocation).toHaveBeenCalled();
```

### Backend Test
```python
def test_emergency_sos():
    response = client.post('/api/hospital/sos/', {
        'latitude': 40.7128,
        'longitude': -74.0060
    })
    assert response.status_code == 200
    assert response.data['success'] is True
```

## Future Enhancements

- [ ] Real-time ambulance tracking on map
- [ ] Voice call integration
- [ ] Medical history quick access
- [ ] Multiple emergency contact notifications
- [ ] Integration with wearable devices
- [ ] Automatic vital signs transmission
- [ ] Video call with emergency responder

## Environment Variables

Add to `.env`:
```bash
EMERGENCY_API_KEY=your_emergency_api_key
TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_token
TWILIO_PHONE=+1234567890
```

## Compliance

Ensure compliance with:
- HIPAA (Health Insurance Portability and Accountability Act)
- Local emergency services regulations
- Data privacy laws (GDPR, CCPA)
- Medical device regulations (if applicable)
