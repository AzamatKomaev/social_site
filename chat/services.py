from django.contrib.auth.models import User

from chat.models import Chat, Message


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
