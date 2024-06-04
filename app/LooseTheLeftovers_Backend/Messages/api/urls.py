from django.urls import path
from Messages.api.views import MessageHandler

urlpatterns = [
    path("", MessageHandler.as_view(), name="messages"),
    path("<int:user_id>", MessageHandler.as_view(), name="conversation"),
]
