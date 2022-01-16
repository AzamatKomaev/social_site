from django.db import models

from server.settings import AUTH_USER_MODEL


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
    """Таблица для хранения токенов регистраций."""
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True)
    token = models.TextField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Токен авторизаций."
        verbose_name_plural = "Токены авторизаций."

    def __str__(self):
        return f"Token {self.token}"

