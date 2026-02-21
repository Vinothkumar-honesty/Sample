from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HospitalViewSet, BedViewSet, DoctorViewSet, BedBookingViewSet
from .emergency import emergency_sos

router = DefaultRouter()
router.register("hospitals", HospitalViewSet, basename="hospital")
router.register("beds", BedViewSet, basename="bed")
router.register("bed-bookings", BedBookingViewSet, basename="bed-booking")
router.register("doctors", DoctorViewSet, basename="doctor")

urlpatterns = [
    path("sos/", emergency_sos, name="emergency-sos"),
    path("", include(router.urls)),
]
