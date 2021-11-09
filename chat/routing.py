from django.urls import path

from . import consumers


websocket_urlpatterns = [
    path('ws/chat/group/<str:token>/', consumers.ChatConsumer.as_asgi()),
    path('ws/chat/personal/<str:users>/', consumers.PersonalChatConsumer.as_asgi()),
]
