from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views


urlpatterns = [
    path("token", obtain_auth_token, name="token"),
    path("users/api/", views.edit_user_profile, name='users'),    
]
