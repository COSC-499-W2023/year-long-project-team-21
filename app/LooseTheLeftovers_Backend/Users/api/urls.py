from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# import views
from Users.api.views import register_user
from Users.api.views import TokenObtainPairSerializerUserId


urlpatterns = [
    path("", register_user, name="register"),
    path('tokens/', TokenObtainPairSerializerUserId.as_view(), name='token_obtain_pair'),
    path('tokens/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
