import random
import string

from django.contrib.auth.models import User
from django.core.mail import send_mail

from social.settings import EMAIL_HOST_USER
from ..models import Token


def return_user_group(user) -> str:
    """Функция для определения в какой группе находиться пользователь."""
    if user.is_authenticated:
        user_group = user.groups.get()
        return str(user_group)
    else:
        return "anon_user"


class CreationUser:
    """Класс для создания пользователя, который хочет зарегаться"""
    token = ""
    user = ""
    alphabet = list(string.ascii_lowercase)

    def __init__(self, data: dict) -> None:
        self.username = data['username']
        self.email = data['email']
        self.password = data['password1']

    def _generate_code(self) -> None:
        for i in range(0, 50):
            self.token += random.choice(self.alphabet)

    def _insert_token_in_table(self) -> None:
        """Добавляем токен в таблицу"""
        Token.objects.create(token=self.token, user_id=self.user.id)

    def send_message_with_code(self) -> None:
        """Отправляем токен на почту"""
        self._generate_code()
        self.create_user()
        content = f"Дарова {self.username}.\n" \
                  "Чтобы успешно пройти регистрацию перейди по данной ссылке:\n" \
                  f"Ссылка: http://127.0.0.1:8000/main/accept_password/{self.token}\n" \
                  "Смотри не ошибись, лошара.\n" \
                  "Всего хорошего ©Azamat Komaev\n\n" \
                  f"Hello, {self.username}.\n" \
                  "If you wanna pass registration, click on the url down:\n" \
                  f"url: http://127.0.0.1:8000/main/accept_password/{self.token}\n" \
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
        self.user = User.objects.create_user(username=self.username,
                                                email=self.email,
                                                password=self.password,
                                                is_active=False
                                        )

        self.user.avatar_set.create()
        self.user.groups.add(1)
        self._insert_token_in_table()


def accept_password_to_reg(token):
    """Функция для установки пользователя активным и удаления токена из таблицы"""
    token_from_db = Token.objects.get(token=token)
    user = User.objects.get(id=token_from_db.user_id)
    user.is_active = True
    user.save()
    token_from_db.delete()
