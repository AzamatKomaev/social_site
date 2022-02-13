from datetime import datetime
from typing import Optional, List, Union

from django.core.paginator import Paginator, EmptyPage
from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import status

from personal_chat_app.models import PersonalChat
from .models import (
    GroupChat, GroupChatRequest, GroupChatRole
)
from user_app.models import User
from group_chat_app.sql.commands import get_ordered_group_chats
from personal_chat_app.sql.commands import get_ordered_personal_chats


def get_and_sort_chat_list(sort_by: Optional[str], request, chat_model, chat_serializer, page) -> dict:
    chat_data: dict[str, Union[dict, int]]
    chats = chat_model.objects.filter(users=request.user)

    if sort_by == "last_message":
        if chat_model == GroupChat:
            chat_qs = GroupChat.objects.raw(get_ordered_group_chats, (request.user.id,))
        else:
            chat_qs = PersonalChat.objects.raw(get_ordered_personal_chats, (request.user.id,))

        serializer = chat_serializer(chat_qs, many=True, context={'request': request})
        chat_data = {
            "list": serializer.data if len(chat_qs) < 5 else serializer.data[:5],
            "status_code": status.HTTP_200_OK
        }

    elif sort_by == "-name" and page:
        page_size = 15
        paginator = Paginator(chats.order_by('-name'), page_size)

        try:
            serializer = chat_serializer(paginator.page(page), many=True, context={'request': request})
            chat_data = {
                "list": serializer.data,
                "status_code": status.HTTP_200_OK
            }
        except EmptyPage:
            chat_data = {
                "list": [],
                "status_code": status.HTTP_204_NO_CONTENT
            }

    else:
        serializer = chat_serializer(chats, many=True, context={'request': request})
        chat_data = {
            "list": serializer.data,
            "status_code": status.HTTP_200_OK
        }

    return chat_data


def sort_chat_list(serializer_data) -> list:
    sorted_list = sorted(serializer_data,
                         key=lambda x: (
                             int(datetime.timestamp(datetime.strptime(x['last_message']['created_at'], '%Y-%m-%dT%H:%M:%S.%f')))
                             if 'created_at' in x['last_message'] else 0
                         ),
                         reverse=True)

    return sorted_list if len(sorted_list) < 5 else sorted_list[0:5]


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

    def is_user_admin(self, user: User):
        return self.chat.creator.id == user.id

    def get_chat_members(self) -> QuerySet:
        """Method to get all chat members."""
        members = self.chat.users.all()
        return members

    @staticmethod
    def create_chat(creator: User, name: str, avatar: Optional[str], users: list[User], *args, **kwargs) -> GroupChat:
        chat: GroupChat

        if not avatar:
            chat = GroupChat.objects.create(
                creator=creator,
                name=name
            )
        else:
            chat = GroupChat.objects.create(
                creator=creator,
                name=name,
                avatar=avatar
            )

        GroupChatRole.objects.create(
            name="Администратор",
            user=creator,
            chat=chat
        )
        chat.users.add(users[0])
        return chat

    def delete_chat(self):
        print("I WAS WORKED3")
        self.chat.delete()


class GroupChatRequestService:
    chat: GroupChat

    def __init__(self, chat_id: int):
        self.chat = get_object_or_404(GroupChat, id=chat_id)

    def _delete_chat_request(self, chat_request: GroupChatRequest) -> bool:
        chat_request.from_chat.users.remove(chat_request.to_user)
        try:
            GroupChatRole.objects.filter(user=chat_request.to_user, chat=chat_request.from_chat).first().delete()
        except AttributeError:
            pass

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

        if not (request_user == chat_request.to_user or request_user == chat_request.from_chat.creator):
            return {
                "is_deleted": False,
                "message": "You dont have a permission to do it.",
                "status": status.HTTP_403_FORBIDDEN
            }

        is_deleted = self._delete_chat_request(chat_request)
        return {
            "is_deleted": is_deleted,
            "message": "Success" if is_deleted else "Bad request",
            "status": status.HTTP_200_OK if is_deleted else status.HTTP_400_BAD_REQUEST
        }


class GroupChatRoleService:
    chat_role: GroupChatRole

    def __init__(self, chat_id: int, user_id: int):
        self.chat_role = get_object_or_404(GroupChatRole, chat=chat_id, user=user_id)

    def print_role(self):
        return self.chat_role
