import json
from typing import Optional

from asgiref.sync import sync_to_async
from django.core.exceptions import ObjectDoesNotExist

from channels.generic.websocket import AsyncWebsocketConsumer

from .models import PersonalChat
from .services import PersonalChatService


class PersonalChatConsumer(AsyncWebsocketConsumer):
    @sync_to_async
    def get_personal_chat(
                self,
                from_user_username: str,
                to_user_username: str
            ) -> Optional[PersonalChat]:
        chat_service = PersonalChatService(from_user_username=from_user_username, to_user_username=to_user_username)
        if not chat_service.is_chat_exists():
            return None
        return chat_service.get_chat_with_both_users()

    async def connect(self):
        interlocutor_username = self.scope['url_route']['kwargs']['username']
        chat = await self.get_personal_chat(
            from_user_username=self.scope['user'].username,
            to_user_username=interlocutor_username,
        )
        if not chat:
            raise ObjectDoesNotExist("Chat doesn't exists.")

        self.chat_group_name = f"personal_chat_{chat.id}"

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
