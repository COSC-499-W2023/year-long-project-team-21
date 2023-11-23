from django.urls import path

# import views
from . import views
from Advertisments.api.views import add_advertisment

urlpatterns = [
    path("", add_advertisment, name="create_ad"),
]
