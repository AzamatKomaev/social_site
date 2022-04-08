from typing import Optional, Union

from django.db.models import QuerySet
from django.db.models.expressions import RawSQL
from django.shortcuts import get_object_or_404
from django.http import Http404

from .models import (
    GroupChat, GroupChatRequest, GroupChatRole
)
from user_app.models import User
from group_chat_app.sql.commands import get_ordered_group_chats
from personal_chat_app.sql.commands import get_ordered_personal_chats


def get_and_sort_chat_list(request, chat_model) -> dict:
    chat_data: dict[str, Union[dict, int]]
    chats = chat_model.objects.filter(users=request.user)
    sort_by = request.query_params.get('sort_by')

    if sort_by == "last_message":
        """Order chats by last message created_at. """
        chat_qs = chat_model.objects.raw(
            get_ordered_group_chats if chat_model == GroupChat else get_ordered_personal_chats,
            (request.user.id, )
        )
        chats = chat_qs if len(chat_qs) < 5 else chat_qs[:5]

    if sort_by == "-name":
        """Order chats by -name. """
        chats = chats.order_by('name')

    return chats


def get_group_chat_serializer_data(request) -> dict[str, str]:
    serializer_data = {
        "name": request.data.get('name', None),
        "users": [request.user.id]
    }
    if 'avatar' in request.data:
        serializer_data = {**serializer_data, "avatar": request.data['avatar']}

    return serializer_data


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
        return self.chat.creator == user

    def get_chat_members(self) -> QuerySet:
        """Method to get all chat members."""
        members = self.chat.users.all()
        return members

    @staticmethod
    def create_chat(name: str, avatar: Optional[str], users: list[User], user: User) -> GroupChat:
        chat: GroupChat

        if not avatar:
            chat = GroupChat.objects.create(
                creator=users[0],
                name=name
            )
        else:
            chat = GroupChat.objects.create(
                creator=users[0],
                name=name,
                avatar=avatar
            )

        GroupChatRole.objects.create(
            name="Администратор",
            user=users[0],
            chat=chat
        )
        chat.users.add(users[0])
        return chat

    def delete_chat(self):
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

    def is_user_receiver(self, user: User):
        try:
            chat_request = self.get_request(user)
        except Http404:
            return False

        return chat_request.to_user == user

    def is_user_admin(self, user: User) -> bool:
        return user == self.chat.creator

    def get_request(self, user: User) -> GroupChatRequest:
        chat_request = get_object_or_404(GroupChatRequest, to_user=user, from_chat=self.chat)
        return chat_request

    @staticmethod
    def get_request_by_id(request_id: int) -> Optional[GroupChatRequest]:
        return GroupChatRequest.objects.filter(id=request_id).first()

    def accept_chat_request(self, chat_request: GroupChatRequest) -> GroupChatRequest:
        """Method to accept a chat request."""
        chat_request.is_accepted = True
        self._add_user_in_chat(chat_request)
        chat_request.save()
        return chat_request

    def delete_chat_request(self, request_user: User, user_id: int) -> bool:
        to_user = get_object_or_404(User, id=user_id)
        chat_request = self.get_request(to_user)
        is_deleted = self._delete_chat_request(chat_request)
        return is_deleted


class GroupChatRoleService:
    chat_role: GroupChatRole

    def __init__(self, chat_role):
        self.chat_role = chat_role

    def is_user_admin(self, user: User) -> bool:
        return self.chat_role.chat.creator == user
