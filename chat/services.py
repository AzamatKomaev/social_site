from django.contrib.auth.models import User

from chat.models import Chat, Message


def can_user_to_join_in_group(room_name: str, user: User) -> bool:
    """Проверяем может ли юзер вступить в беседу."""
    if Chat.objects.filter(name=room_name).exists() and user in Chat.objects.get(name=room_name).users.all():
        return True

    return False


def get_data_about_room(chat_name: str) -> dict:
    chat = Chat.objects.get(name=chat_name)
    messages = Message.objects.filter(chat=chat)
    return {
        'messages': messages,
        'chat': chat
    }
