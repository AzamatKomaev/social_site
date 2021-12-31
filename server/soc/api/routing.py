from django.urls import path

from . import consumers
from . import views


websocket_urlpatterns = [
    path("ws/group_chat/<int:chat_id>/", consumers.GroupChatConsumer.as_asgi()),
    path("ws/personal_chat/<str:username>/", consumers.PersonalChatConsumer.as_asgi()),
]
