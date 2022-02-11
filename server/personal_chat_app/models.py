from django.db import models

from server.settings import AUTH_USER_MODEL


class PersonalChat(models.Model):
    users = models.ManyToManyField(AUTH_USER_MODEL)

    def __str__(self):
        return f"Chat between {self.users.first()} and {self.users.last()}."


class PersonalMessage(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(PersonalChat, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = "Личное сообщение"
        verbose_name_plural = "Личные сообщения"
        ordering = ('-created_at',)
