from django.urls import path

from . import consumers
from . import views


websocket_urlpatterns = [
    path("ws/chat/", consumers.UserConsumer.as_asgi()),
]
