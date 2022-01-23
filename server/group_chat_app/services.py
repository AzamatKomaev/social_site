from typing import Optional

from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import status

from .models import (
    GroupChat, GroupChatRequest, GroupChatRole
)
from user_app.models import User


class GroupChatService:
    chat: GroupChat

    def __init__(self, chat: GroupChat):
        self.chat = chat

    def get_chat_messages(self) -> QuerySet:
        """Method to get all messages in group chat."""
        messages = self.chat.groupmessage_set.all()
        return messages

    def is_user_member(self, user: User) -> bool:
        """Method to check is this user member of group chat."""
        return bool(user in self.chat.users.all())

    def get_chat_members(self) -> QuerySet:
        """Method to get all chat members."""
        members = self.chat.users.all()
        return members


class GroupChatRequestService:
    chat: GroupChat

    def __init__(self, chat_id: int):
        self.chat = get_object_or_404(GroupChat, id=chat_id)

    def _delete_chat_request(self, chat_request: GroupChatRequest) -> bool:
        chat_request.from_chat.users.remove(chat_request.to_user)
        GroupChatRole.objects.filter(user=chat_request.to_user, chat=chat_request.from_chat).first().delete()
        return bool(chat_request.delete())

    def _add_user_in_chat(self, chat_request: GroupChatRequest) -> None:
        """
        Method to finally add user in chat. Here we add user in users list of chat and
        also create Role model for user in the chat
        """
        chat_request.from_chat.users.add(chat_request.to_user)
        GroupChatRole.objects.create(
            user=chat_request.to_user,
            chat=chat_request.from_chat
        )

    def is_request_exists(self, user_id: int) -> bool:
        return GroupChatRequest.objects.filter(from_chat=self.chat, to_user=user_id).exists()

    def get_all_chat_requests(self) -> QuerySet[GroupChatRequest]:
        chat_requests = GroupChatRequest.objects.filter(from_chat=self.chat)
        return chat_requests

    @staticmethod
    def get_all_user_chat_requests(user_id: int) -> QuerySet[GroupChatRequest]:
        user_chat_requests = GroupChatRequest.objects.filter(to_user=user_id, is_accepted=False)
        return user_chat_requests

    def create_chat_request(self, user_id: int) -> GroupChat:
        user = get_object_or_404(User, id=user_id)
        new_chat_request = GroupChatRequest.objects.create(
            to_user=user,
            from_chat=self.chat
        )
        return new_chat_request

    def is_user_admin(self, user: User) -> bool:
        return user == self.chat.creator

    def get_request_or_none(self, user: User) -> Optional[GroupChatRequest]:
        return GroupChatRequest.objects.filter(
            to_user=user,
            from_chat=self.chat
        ).first()

    @staticmethod
    def get_request_by_id(self, request_id: int) -> Optional[GroupChatRequest]:
        return GroupChatRequest.objects.filter(id=request_id).first()

    def accept_chat_request(self, chat_request: GroupChatRequest) -> GroupChatRequest:
        """Method to accept a chat request."""
        chat_request.is_accepted = True
        self._add_user_in_chat(chat_request)
        chat_request.save()
        return chat_request

    def delete_chat_request(self, request_user: User, user_id: int) -> dict:
        to_user = get_object_or_404(User, id=user_id)
        chat_request = self.get_request_or_none(to_user)

        if not chat_request:
            return {
                "is_deleted": False,
                "message": "Not found. Chat request doesnt exists.",
                "status": status.HTTP_404_NOT_FOUND
            }

        if request_user == chat_request.to_user or request_user == chat_request.from_chat.creator:
            return {
                "is_deleted": self._delete_chat_request(chat_request),
                "message": "Success",
                "status": status.HTTP_204_NO_CONTENT
            }

        return {
            "is_deleted": False,
            "message": "Bad request",
            "status": status.HTTP_400_BAD_REQUEST
        }

