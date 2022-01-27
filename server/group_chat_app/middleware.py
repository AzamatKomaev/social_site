import json
import re
from typing import Union

from django.shortcuts import get_object_or_404
from rest_framework import status

from group_chat_app.models import GroupChat
from group_chat_app.services import GroupChatService, GroupChatRequestService
from user_app.models import User


class GroupChatMiddleware:
    prefixes = {
        "chat_retrieve": r"/api/v1/chats\/\d+\/$",
        "chat_messages": r"/api/v1/chats\/\d+/messages/$",
        "chat_members": r"/api/v1/chats\/\d+/members/$",
        "chat_request_without_user_id": r"/api/v1/chats\/\d+/request/$"
    }

    def _change_response(self, response, content, status_code):
        response.content = json.dumps(content)
        response.status = status_code
        return response

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if (
            re.match(self.prefixes['chat_retrieve'], request.path) or
            re.match(self.prefixes['chat_messages'], request.path) or
            re.match(self.prefixes['chat_members'], request.path) or
            (re.match(self.prefixes['chat_request_without_user_id'], request.path) and (request.method == "GET"))
        ):
            chat_id = int(request.path.split("/")[4])
            chat = get_object_or_404(GroupChat, id=chat_id)

            data_is_user_member = self.is_user_member(request, chat)

            if data_is_user_member['error_bool']:
                response = self._change_response(
                    response=response,
                    content=data_is_user_member['info'],
                    status_code=data_is_user_member['status_code']
                )

        return response

    def is_user_member(self, request, chat: GroupChat) -> dict[str, Union[bool, str, int]]:
        chat_service = GroupChatService(chat)
        is_user_member = chat_service.is_user_member(request.user)

        return {
            "error_bool": not is_user_member,
            "info": {
                "message": "You don't have permissions to see this chat."
            },
            "status_code": 200 if is_user_member else 403
        }

    def is_user_admin(self, request, chat: GroupChat) -> dict[str, Union[bool, str, int]]:
        chat_request_service = GroupChatRequestService(chat.id)
        is_user_admin = chat_request_service.is_user_admin(request.user)

        return {
            "error_bool": not is_user_admin,
            "info": {
                "message": "You don't have permissions to see this chat."
            },
            "status_code": 200 if is_user_admin else 403
        }

