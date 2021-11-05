import logging
import json

from asgiref.sync import sync_to_async
from django.utils import dateformat, timezone
from channels.generic.websocket import AsyncWebsocketConsumer

from chat.models import Message, Chat
from social.settings import DATETIME_FORMAT


logger = logging.getLogger(__name__)

"""
DONT FORGET TO CREATE CONTAINER WITH REDIS:
sudo docker run -p 6379:6379 -d redis:5

IF YOU CREATED IT, YOU CAN TO START IT:
sudo docker start <id container>
"""


class ChatConsumer(AsyncWebsocketConsumer):
    user = ""

    @sync_to_async
    def create_message_and_get_data(self, message: str, room_name: str, user) -> dict:
        chat = Chat.objects.get(name=room_name)
        message = Message.objects.create(text=message, user_id=user.id, chat_id=chat.id)
        avatar = message.user.avatar_set.get().image.url
        return {
            'avatar': avatar,
            'message': message
        }

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
        data = await self.create_message_and_get_data(text_data_json['message'], self.room_name, self.user)
        created_at = dateformat.format(data['message'].created_at, DATETIME_FORMAT)

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'user': self.user.username,
                'message': data['message'].text,
                'avatar': data['avatar'],
                'created_at': str(created_at)
            }
        )

    async def chat_message(self, event):
        user = event['user']
        message = event['message']
        avatar = event['avatar']
        created_at = event['created_at']

        await self.send(text_data=json.dumps({
            'user': user,
            'avatar': avatar,
            'message': message,
            'created_at': created_at
        }))
