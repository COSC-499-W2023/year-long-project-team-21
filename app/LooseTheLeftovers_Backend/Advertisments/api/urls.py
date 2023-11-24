from django.urls import path
from . import views

urlpatterns = [
    path("", views.AdvertismentView.as_view(), name="create_ad"),
]
