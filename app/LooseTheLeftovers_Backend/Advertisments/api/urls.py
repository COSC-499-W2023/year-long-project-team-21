from django.urls import path
from Advertisments.api.views import AdvertismentHandler

urlpatterns = [
    path("", AdvertismentHandler.as_view(), name="all-ads"),
    path("<int:ad_id>/", AdvertismentHandler.as_view(), name="specific-ad"),
    path("users/<int:user_id>/", AdvertismentHandler.as_view(), name="user-ads"),
    path("", AdvertismentHandler.as_view(), name="create-ad"),
    path("location/", AdvertismentHandler.as_view(), name="location-ads"),
]
