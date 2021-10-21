import logging
import json

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from django.shortcuts import redirect
from django.core.exceptions import ObjectDoesNotExist

from chat.models import Message, Chat


logger = logging.getLogger(__name__)

"""
DONT FORGET TO START REDIS:
sudo docker run -p 6379:6379 -d redis:5
"""

@sync_to_async
def create_message(message: str, room_name: str, user) -> Message:
    chat = Chat.objects.get(name=room_name)
    message = Message.objects.create(text=message, user_id=user.id, chat_id=chat.id)
    return message


class ChatConsumer(AsyncWebsocketConsumer):
    user = ""

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['chat_name']
        self.chat_group_name = 'chat_%s' % self.room_name
        self.user = self.scope['user']

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await create_message(message, self.room_name, self.user)

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'user': self.user.username,
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']
        user = event['user']

        await self.send(text_data=json.dumps({
            'message': message,
            'user': user
        }))

