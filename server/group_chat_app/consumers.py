import json
from typing import Union, Optional

from asgiref.sync import sync_to_async
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.exceptions import PermissionDenied
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import GroupChat
from .services import GroupChatService


class GroupChatConsumer(AsyncWebsocketConsumer):
    @sync_to_async
    def get_chat(self, chat_id: int) -> Optional[GroupChat]:
        return GroupChat.objects.filter(id=chat_id).first()

    async def connect(self):
        chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = 'group_chat_%s' % chat_id

        chat = await self.get_chat(chat_id)
        if not chat:
            raise ObjectDoesNotExist("Chat doesn't exists.")

        chat_service = GroupChatService(chat)

        if not await sync_to_async(chat_service.is_user_member)(self.scope['user']):
            raise PermissionDenied("You are not member of this chat.")

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):

        text_data_json = json.loads(text_data)

        await self.channel_layer.group_send(
            self.chat_group_name,
            {**text_data_json}
        )

    async def send_message(self, event):
        await self.send(text_data=json.dumps(event['data']))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )
