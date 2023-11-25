from django.urls import path
from . import views

urlpatterns = [
    path("create_ad", views.add_advertisment, name="create_ad"),
]
