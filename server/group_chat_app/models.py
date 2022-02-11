from django.db import models
from datetime import datetime

from server.settings import AUTH_USER_MODEL
from user_app.base_models import BaseRequest


class GroupChat(models.Model):
    name = models.CharField(max_length=50, help_text="Название чата")
    created_at = models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(default="/static/img/me.png", upload_to="media/group_avatars")
    creator = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="creator_id")
    users = models.ManyToManyField(AUTH_USER_MODEL, related_name="users_id")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Чат"
        verbose_name_plural = "Чаты"


class GroupChatRole(models.Model):
    CHAT_ROLES = [
        ("Администратор", 'Creator'),
        ("Модератор", 'Moderator'),
        ("Участник", 'Member'),
    ]

    name = models.CharField(
        max_length=30,
        choices=CHAT_ROLES,
        default="Участник"
    )
    data_joined = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE)


class GroupMessage(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = "Групповое сообщение"
        verbose_name_plural = "Групповые сообщения"
        ordering = ('-created_at',)


class GroupChatRequest(BaseRequest):
    from_chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, related_name="from_chat")

    class Meta:
        verbose_name = "Приглашение в чат"
        verbose_name_plural = "Приглашения в чат"
        ordering = ("-created_at",)

    def __str__(self):
        return f"From {self.from_chat} chat to {self.to_user}"
