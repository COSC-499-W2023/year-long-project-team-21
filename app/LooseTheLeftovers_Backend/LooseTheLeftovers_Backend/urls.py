from django.contrib import admin
from django.urls import path, include


# global views
urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/", include("Users.api.urls")),
]
