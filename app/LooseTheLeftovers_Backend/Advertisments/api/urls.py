from django.urls import path
from . import views

urlpatterns = [
    path("", views.create_advertisment, name="create-ad"),
    path("<int:ad_id>/", views.get_advertisment, name="specific-ad"),
    path("<int:user_id>/", views.get_advertisment, name="user-ads"),
    path("", views.get_advertisment, name="ads"),
]
