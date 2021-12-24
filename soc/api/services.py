import random
import string
from typing import Union

from django.core.mail import send_mail
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.db.models import QuerySet

from social.settings import EMAIL_HOST_USER
from soc.models import AcceptAuthToken
from soc.models import (
    User,
    GroupChat,
    PersonalChat,
    GroupMessage,
    PersonalMessage
)


class CreationUser:
    """Класс для создания пользователя, который хочет зарегаться"""
    token: str = ""
    user: User
    alphabet = list(string.ascii_lowercase)

    def __init__(self, data: dict) -> None:
        self.username = data['username']
        self.email = data['email']
        self.password = data['password']

    def _generate_code(self) -> None:
        for i in range(0, 50):
            self.token += random.choice(self.alphabet)

    def _insert_token_in_table(self) -> None:
        """Добавляем токен в таблицу"""
        AcceptAuthToken.objects.create(token=self.token, user_id=self.user.id)

    def check_form_on_uniqueness(self) -> list:
        """Проверяем почту и логин на уникальность"""
        errors = [None, None]
        errors[0] = User.objects.filter(username=self.username).exists()
        errors[1] = User.objects.filter(email=self.email).exists()
        return errors

    def send_message_with_code(self) -> None:
        """Отправляем токен на почту"""
        self._generate_code()
        content = f"Дарова {self.username}.\n" \
                  "Чтобы успешно пройти регистрацию перейди по данной ссылке:\n" \
                  f"Ссылка: http://127.0.0.1:8000/auth/accept/{self.token}\n" \
                  "Смотри не ошибись, братело :).\n" \
                  "Всего хорошего ©Azamat Komaev\n\n" \
                  f"Hello, {self.username}.\n" \
                  "If you wanna pass registration, click on the url down:\n" \
                  f"url: http://127.0.0.1:8000/auth/accept/{self.token}\n" \
                  "Dont make mistake, bro :)\n" \
                  "Good luck ©Azamat Komaev"

        send_mail(
            "Регистрация в InTheGame",
            content,
            EMAIL_HOST_USER,
            [self.email]
        )

    def create_user(self) -> None:
        """Метод для создания нового пользователя"""
        self.send_message_with_code()

        self.user = User.objects.create_user(
            username=self.username,
            email=self.email,
            password=self.password,
            is_active=False
        )

        self.user.avatar_set.create()
        Group.objects.all().last().user_set.add(self.user)
        self._insert_token_in_table()


def accept_password_to_reg(token: str) -> None:
    """Функция для установки пользователя активным и удаления токена из таблицы"""
    token_from_db = AcceptAuthToken.objects.get(token=token)
    user = User.objects.get(id=token_from_db.user_id)
    user.is_active = True
    user.save()
    token_from_db.delete()


class GroupChatService:
    chat: GroupChat

    def __init__(self, chat: GroupChat):
        self.chat = chat

    def get_chat_messages(self) -> QuerySet:
        messages = self.chat.groupmessage_set.all()
        return messages

    def is_user_member(self, user: User) -> bool:
        return bool(user in self.chat.users.all())

    def get_chat_members(self) -> QuerySet:
        members = self.chat.users.all()
        return members


class PersonalChatService:
    from_user: User
    to_user: User

    def __init__(self, from_user_username: str, to_user_username: str):
        self.from_user = get_object_or_404(User, username=from_user_username)
        self.to_user = get_object_or_404(User, username=to_user_username)

    def create(self) -> PersonalChat:
        chat = PersonalChat.objects.create()
        chat.users.add(self.from_user, self.to_user)

    @staticmethod
    def get_interlocutor(personal_chat: PersonalChat, user: User) -> User:
        members_of_personal_chat = personal_chat.users.all()
        return members_of_personal_chat.exclude(username=user.username).get()

    def get_chat_with_both_users(self):
        return PersonalChat.objects.filter(users=self.from_user).filter(users=self.to_user).first()

    def get_messages(self):
        messages = self.get_chat_with_both_users().personalmessage_set.all()
        return messages

    def is_chat_exists(self) -> bool:
        """Метод для проверки существует ли уже чат между двумя юзерами."""
        return bool(self.get_chat_with_both_users())

    def get_value_for_connecting_ws(self) -> str:
        """
        Функция для получения значения для одного подключения для двух юзеров
        (строка с id двух юзеров, разделенная нижним подчеркиванием).
        """
        chat = self.get_chat_with_both_users()
        users_id = [str(user.id) for user in chat.users.all().order_by("id")]
        return "_".join(users_id)
