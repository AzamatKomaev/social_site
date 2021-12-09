import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

from . import serializers
from soc.models import Chat, Message


class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        print(self.scope['user'])
        self.chat_group_name = 'group_chat_%s' % self.scope['url_route']['kwargs']['chat_id']

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
