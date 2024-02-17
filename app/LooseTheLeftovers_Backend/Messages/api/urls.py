from django.urls import path
from Messages.api.views import MessageHandler

urlpatterns = [
    path("", MessageHandler.as_view(), name="messages"),
]
