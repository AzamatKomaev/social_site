from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from chat.models import (
    Chat,
    Message,
    PersonalChat
)


def get_data_about_user_chats(user: User) -> dict:
    """Получаем информацию о чатах пользователя."""
    data_json = {}

    chats = Chat.objects.filter(users=user)
    for chat in chats:
        """Привязываем ключ с чатом и значение с его сообщениями."""
        last_message = chat.message_set.all().last()
        data_json[chat] = last_message

    return data_json


def can_user_to_join_in_group(room_name: str, user: User) -> bool:
    """Проверяем может ли юзер вступить в беседу."""
    if Chat.objects.filter(name=room_name).exists() and user in Chat.objects.get(name=room_name).users.all():
        return True

    return False


def get_data_about_room(chat_name: str) -> dict:
    """Получаем информацию о чате."""
    chat = Chat.objects.get(name=chat_name)
    messages = Message.objects.filter(chat=chat)
    return {
        'messages': messages,
        'chat': chat
    }


def is_users_friends(first_id: int, second_id: int) -> bool:
    return True


class PersonalChatService:
    from_user: User
    to_user: User

    def __init__(self, from_username: str, to_username: str):
        self.from_user = User.objects.get(username=from_username)
        self.to_user = User.objects.get(username=to_username)

    def create(self) -> None:
        """Метод для создания диалога для двух юзеров"""
        pers_chat = PersonalChat.objects.create()
        pers_chat.users.add(self.from_user, self.to_user)

    def is_chat_exists(self) -> bool:
        """Метод для проверки существует ли уже чат между двумя юзерами."""
        chat = PersonalChat.objects.filter(users=self.from_user).filter(users=self.to_user).first()
        if not chat:
            return False

        return True

    def get_chat_messages(self) -> list:
        chat = PersonalChat.objects.filter(users=self.from_user).filter(users=self.to_user).first()
        messages = chat.personalmessage_set.all()
        return messages
