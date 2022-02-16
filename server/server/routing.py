from django.urls import path

from group_chat_app.consumers import GroupChatConsumer
from personal_chat_app.consumers import PersonalChatConsumer


websocket_urlpatterns = [
    path("ws/group_chat/<int:chat_id>", GroupChatConsumer.as_asgi()),
    path("ws/personal_chat/<str:username>", PersonalChatConsumer.as_asgi()),
]

