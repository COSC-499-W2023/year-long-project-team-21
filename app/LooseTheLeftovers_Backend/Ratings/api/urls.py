from django.urls import path
from Ratings.api.views import RatingHandler

urlpatterns = [
    path("", RatingHandler.as_view(), name="post-ratings"),
    path("<int:user_id>", RatingHandler.as_view(), name="get-ratings"),
]
