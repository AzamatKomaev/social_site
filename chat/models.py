from uuid import uuid4

from django.db import models
from soc.models import User
from django.utils import timezone


class Chat(models.Model):
    name = models.CharField(max_length=50, help_text="Название чата")
    created_at = models.DateTimeField(auto_now_add=True)
    token = models.UUIDField(default=uuid4, editable=False)
    avatar = models.ImageField(default="/static/img/me.png", upload_to="media/group_avatars")
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator_id")
    users = models.ManyToManyField(User, related_name="users_id")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Чат"
        verbose_name_plural = "Чаты"


class Message(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def was_created_minutes_ago(self):
        difference = timezone.now() - self.created_at
        return difference

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"


class PersonalChat(models.Model):
    users = models.ManyToManyField(User)

    def __str__(self):
        return str(self.id)


class PersonalMessage(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(PersonalChat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.text
