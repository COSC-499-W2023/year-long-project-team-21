from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# import views
from Users.api.views import UsersHandler
from Users.api.views import TokenObtainPairSerializerUserId


urlpatterns = [
    path("", UsersHandler.as_view(), name="users"),
    path("<int:user_id>/", UsersHandler.as_view(), name="specific_user"),
    path(
        "tokens/", TokenObtainPairSerializerUserId.as_view(), name="token_obtain_pair"
    ),
    path("tokens/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("password_reset/", include('django_rest_passwordreset.urls', namespace='password_reset'))
]
