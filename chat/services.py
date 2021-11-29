from soc.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import QuerySet

from chat.models import (
    Chat,
    Message,
    PersonalChat
)


class UserChat:
    user: User
    group_chats: QuerySet
    personal_chats: QuerySet

    def __init__(self, user: User):
        self.user = user
        self.group_chats = Chat.objects.filter(users=user)
        self.personal_chats = PersonalChat.objects.filter(users=user)

    def get_interlocutor(self, personal_chat: PersonalChat) -> User:
        members_of_personal_chat = personal_chat.users.all()
        return members_of_personal_chat.exclude(username=self.user.username).get()

    def return_dict_with_chats_and_last_messages(self, chats: QuerySet, is_personal: bool) -> dict:
        data_chat = {}
        for chat in chats:
            if is_personal:
                last_message = chat.personalmessage_set.all().last()
                data_chat[chat] = {}
                data_chat[chat]['last_message'] = last_message
                data_chat[chat]['interlocutor'] = self.get_interlocutor(personal_chat=chat)
            else:
                last_message = chat.message_set.all().last()
                data_chat[chat] = last_message

        return data_chat

    def get_data_about_user_chats(self) -> dict:
        group_chats_data = self.return_dict_with_chats_and_last_messages(chats=self.group_chats, is_personal=False)
        personal_chats_data = self.return_dict_with_chats_and_last_messages(chats=self.personal_chats, is_personal=True)
        print(personal_chats_data)
        return {
            "group_chats_data": group_chats_data,
            "personal_chats_data": personal_chats_data
        }


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

    def get_chat_with_both_users(self):
        return PersonalChat.objects.filter(users=self.from_user).filter(users=self.to_user).first()

    def is_chat_exists(self) -> bool:
        """Метод для проверки существует ли уже чат между двумя юзерами."""
        chat = self.get_chat_with_both_users()
        if not chat:
            return False

        return True

    def get_chat_messages(self) -> list:
        chat = self.get_chat_with_both_users()
        messages = chat.personalmessage_set.all()
        return messages

    def get_value_for_connecting_ws(self) -> str:
        """
        Функция для получения значения для одного подключения для двух юзеров
        (строка с id двух юзеров, разделенная пробелом).
        """
        chat = self.get_chat_with_both_users()
        users_id = [str(user.id) for user in chat.users.all().order_by("id")]
        return "_".join(users_id)
