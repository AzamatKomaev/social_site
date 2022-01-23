from django.db import models
from django.contrib.auth.models import AbstractUser

from server.settings import AUTH_USER_MODEL
from .base_models import BaseRequest


class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        error_messages={
            'unique': 'Пользователь с такой почтой уже существует.'
        }
    )
    friends = models.ManyToManyField(AUTH_USER_MODEL, blank=True)


class Avatar(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(default="/static/img/me.png", upload_to="media/user_images")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Аватар"
        verbose_name_plural = "Аватарки"

    def __str__(self):
        return f"Аватарка пользователя {self.user}"


class AcceptAuthToken(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True)
    token = models.TextField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Токен авторизаций."
        verbose_name_plural = "Токены авторизаций."

    def __str__(self):
        return f"Token {self.token}"


class FriendRequest(BaseRequest):
    from_user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="from_user")

    class Meta:
        verbose_name = "Заявка в друзья"
        verbose_name_plural = "Заявки в друзья"
        ordering = ("-created_at",)

    def __str__(self):
        return f"From {self.from_user} to {self.to_user}"
