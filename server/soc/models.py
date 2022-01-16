from django.db import models
from django.contrib.auth.models import AbstractUser

from server.settings import AUTH_USER_MODEL


class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        error_messages={
            'unique': 'Пользователь с такой почтой уже существует.'
        }
    )
    friends = models.ManyToManyField(AUTH_USER_MODEL, blank=True)
