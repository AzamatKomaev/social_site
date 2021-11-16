from django.db import models

from rest_framework.authtoken.models import Token


class TokenWasUsed(models.Model):
    token = models.ForeignKey(Token, on_delete=models.CASCADE, db_column="token")
    how_many_used = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Использований токена"
        verbose_name_plural = "Использования токенов"

    def __str__(self):
        return f"Token {self.token}"
