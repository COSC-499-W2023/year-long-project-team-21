from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


# global views
urlpatterns = [
    # Administrator portal
    path("admin/", admin.site.urls),
    # linking to User's urls.api
    path("users/", include("Users.api.urls")),
    # linking to Advertisments's urls.api
    path("ads/", include("Advertisments.api.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
