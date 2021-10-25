from django.db import models
from django.contrib.auth.models import User


class Token(models.Model):
    """Таблица для хранения токенов регистраций."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    token = models.TextField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Токен"
        verbose_name_plural = "Токены"

    def __str__(self):
        return f"Token {self.token}"
