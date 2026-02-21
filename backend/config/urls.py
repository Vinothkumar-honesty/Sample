"""
URL configuration for MediFlow AI backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .health import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", health_check, name="health_check"),
    path("api/auth/", include("apps.users.urls")),
    path("api/triage/", include("apps.triage.urls")),
    path("api/hospital/", include("apps.hospital.urls")),
    path("api/appointments/", include("apps.appointments.urls")),
    path("api/prediction/", include("apps.prediction.urls")),
    path("api/records/", include("apps.records.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
