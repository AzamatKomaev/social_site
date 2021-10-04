import random
import string

from django.contrib.auth.models import User
from django.core.mail import send_mail

from social.settings import EMAIL_HOST_USER
from .models import Post, Token
from .forms import CommentForm


def return_user_group(user) -> str:
    """Функция для определения в какой группе находиться пользователь."""
    if user.is_authenticated:
        user_group = user.groups.get()
        return str(user_group)
    else:
        return "anon_user"



def get_form_and_create_comment(request, post):
    """Функция для получения формы для комментария и его создания"""
    form = CommentForm(request.POST)
    if form.is_valid():
        user_id = request.user.id
        comment_text = form.cleaned_data["text"]
        post.comment_set.create(text=comment_text, user_id=user_id)

    return form


def get_post_data(request, post_data: dict) -> dict:
    """Функция для получения данных из формы"""
    title = post_data["title"]
    post = post_data["post"]
    image = post_data["image"]
    user_id = request.user.id
    return {"title": title, "post": post, "image": image, "user_id": user_id}


def insert_into_post_table(title, post, image, user_id) -> None:
    """Функция для создания поста"""
    add_post = Post.objects.create(title=title, text=post, user_id=user_id)
    add_post.attachment_set.create(photo=image) if image else None


def check_user_form_on_errors(form) -> str:
    """Функция для проверки данных из формы на правильность ввода"""
    data_form = form.cleaned_data
    if data_form['password1'] != data_form['password2']:
        return "both_password_error"

    elif len(data_form['password1']) < 8:
        return "password_error"

    elif User.objects.filter(email=data_form['email']).exists():
        return "email_error"

    else:
        return "not errors"


class CreationUser:
    """Класс для создания пользователя, который хочет зарегаться"""
    token = ""
    user = ""
    alphabet = list(string.ascii_lowercase)

    def __init__(self, data: dict):
        self.username = data['username']
        self.email = data['email']
        self.password = data['password1']

    def _generate_code(self) -> None:
        for i in range(0, 30):
            self.token += random.choice(self.alphabet)

    def _insert_token_in_table(self):
        """Добавляем токен в таблицу"""
        token = Token.objects.create(token=self.token, user_id=self.user.id)


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
        self.user.groups.add(1)
        self._insert_token_in_table()


def accept_password_to_reg(token):
    """Функция для установки пользователя активным и удаления токена из таблицы"""
    token_from_db = Token.objects.get(token=token)
    user = User.objects.get(id=token_from_db.user_id)
    user.is_active = True
    user.save()
    token.delete()


def create_cron_task(name, time):
    pass


def get_post_and_comments(id):
    post = Post.objects.get(id=id)
    comments = post.comment_set.all().order_by('-pk') if post.comment_set.all() else None
    return {
        'post': post,
        'comments': comments
    }