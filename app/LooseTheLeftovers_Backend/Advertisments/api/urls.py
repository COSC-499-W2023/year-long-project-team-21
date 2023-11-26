from django.urls import path
from . import views

urlpatterns = [
    path("ads/create/", views.create_advertisment, name="create-ad"),
]
