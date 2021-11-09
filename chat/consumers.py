import logging
import json

from asgiref.sync import sync_to_async
from django.utils import dateformat
from django.contrib.auth.models import User
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from chat.models import Message, Chat, PersonalMessage
from chat.services import PersonalChatService
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
    token = ""

    @sync_to_async
    def create_message_and_get_data(self, message: str, token: str, user) -> dict:
        chat = Chat.objects.get(token=token)
        message = Message.objects.create(text=message, user_id=user.id, chat_id=chat.id)
        avatar = message.user.avatar_set.get().image.url
        return {
            'avatar': avatar,
            'message': message
        }

    async def connect(self):
        self.token = self.scope['url_route']['kwargs']['token']
        self.room_name = self.token
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
        data = await self.create_message_and_get_data(text_data_json['message'], self.token, self.user)
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


class PersonalChatConsumer(AsyncWebsocketConsumer):
    chat_service: PersonalChatService

    @sync_to_async
    def parse_value_for_connecting_ws(self, string: str) -> list:
        """Функция для парсинга значения для одного подключения двух юзеров."""
        users_id = string.split("_")
        return [User.objects.get(id=int(users_id[0])), User.objects.get(id=int(users_id[1]))]

    @sync_to_async
    def get_chat_service(self, from_user_username: str, to_user_username: str):
        return PersonalChatService(from_username=from_user_username, to_username=to_user_username)

    @sync_to_async
    def get_user_avatar(self, user: User):
        return user.avatar_set.get().image.url

    @sync_to_async
    def create_message_and_get_data(self, message_text: Message, user: User) -> dict:
        chat = self.chat_service.get_chat_with_both_users()
        message = PersonalMessage.objects.create(text=message_text, user_id=user.id, chat_id=chat.id)
        return {
            'message': message,
            'user': {
                'username': message.user.username,
                'avatar': message.user.avatar_set.get().image.url
            }
        }

    async def connect(self):
        users = await self.parse_value_for_connecting_ws(self.scope['url_route']['kwargs']['users'])
        self.chat_service = await self.get_chat_service(users[0], users[1])
        chat = await database_sync_to_async(self.chat_service.get_chat_with_both_users)()

        self.room_name = await database_sync_to_async(self.chat_service.get_value_for_connecting_ws)()
        self.chat_group_name = f"Chat_{chat.id}"

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
        data = await self.create_message_and_get_data(user=self.scope['user'], message_text=text_data_json['message'])
        created_at = dateformat.format(data['message'].created_at, DATETIME_FORMAT)

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': {
                    "text": data['message'].text,
                    "created_at": created_at
                },
                'user': {
                    'username': data['user']['username'],
                    'avatar': data['user']['avatar']
                }
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': {
                'text': event['message']['text'],
                'created_at': event['message']['created_at'],
            },
            'user': {
                'username': event['user']['username'],
                'avatar': event['user']['avatar']
            }
        }))
