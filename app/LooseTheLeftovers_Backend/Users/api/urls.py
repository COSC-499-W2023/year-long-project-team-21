from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

# import views
from Users.api.views import registration_view


urlpatterns = [
    path("", registration_view, name="register"),
    path("token", obtain_auth_token, name="token"),
]
