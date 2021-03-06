from django.http import Http404
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import PersonalChat
from user_app.models import User


class PersonalChatService:
    from_user: User
    to_user: User

    def __init__(self, from_user_username: str, to_user_username: str):
        self.from_user = get_object_or_404(User, username=from_user_username)
        self.to_user = get_object_or_404(User, username=to_user_username)

    def create(self) -> PersonalChat:
        """Method to create personal chat among two users"""
        chat = PersonalChat.objects.create()
        chat.users.add(self.from_user, self.to_user)
        return chat

    @staticmethod
    def get_interlocutor(personal_chat: PersonalChat, user: User) -> User:
        """Method to get interlocutor of personal chat."""
        members_of_personal_chat = personal_chat.users.all()
        return members_of_personal_chat.exclude(username=user.username).get()

    def get_chat_with_both_users(self):
        """Method to get chat with both users."""
        personal_chat = PersonalChat.objects.filter(users=self.from_user).filter(users=self.to_user).first()
        if not personal_chat:
            raise Http404()

        return personal_chat

    def get_messages(self):
        """Method to get messages in chat with both users."""
        messages = self.get_chat_with_both_users().personalmessage_set.all()
        return messages

    def is_chat_exists(self) -> bool:
        """Method to check is chat exists between both users."""
        return bool(self.get_chat_with_both_users())
