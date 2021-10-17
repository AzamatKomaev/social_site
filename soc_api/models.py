from django.db import models

from rest_framework.authtoken.models import Token


class TokenWasUsed(models.Model):
    token = models.ForeignKey(Token, on_delete=models.CASCADE, db_column="Токен")
    how_many_used = models.IntegerField(db_column="Использований", default=0)
    created_at = models.DateTimeField(db_column="Время создания", auto_now=True)

    class Meta:
        verbose_name = "Использований токена"
        verbose_name_plural = "Использования токенов"
