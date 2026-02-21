from django.urls import path
from .views import surge_prediction

urlpatterns = [
    path("surge/", surge_prediction),
]
