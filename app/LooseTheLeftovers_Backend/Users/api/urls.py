from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

# import views
from Users.api.views import register_user


urlpatterns = [
    path("", register_user, name="register"),
    path("token", obtain_auth_token, name="token"),
]
