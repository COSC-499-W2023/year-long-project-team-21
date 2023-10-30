from django.contrib import admin
from django.urls import path, include

# global views
urlpatterns = [
    # Administrator portal
    path("admin/", admin.site.urls),
    # linking to User's urls.api 
    path("users/", include("Users.api.urls")),
]
