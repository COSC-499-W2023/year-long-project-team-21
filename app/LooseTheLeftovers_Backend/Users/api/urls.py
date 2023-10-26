from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from Users.api.views import HelloWorld

urlpatterns = [
    path("token", obtain_auth_token, name="token"),
    path("hello-world/", HelloWorld, name="hello_world"),
]
