from django.urls import path
from Advertisments.api.views import AdvertismentHandler

urlpatterns = [
    path("", AdvertismentHandler.as_view(), name="all-ads"),
    path("<int:ad_id>/", AdvertismentHandler.as_view(), name="specific-ad"),
    path("user/<int:user_id>/", AdvertismentHandler.as_view(), name="user-ads"),
    path("create", AdvertismentHandler.as_view(), name="create-ad")
]
