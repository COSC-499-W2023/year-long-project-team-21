from django.urls import path
from . import views

urlpatterns = [
    path("", views.create_advertisment, name="create-ad"),
]
