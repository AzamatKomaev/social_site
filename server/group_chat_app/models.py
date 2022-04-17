from django.db import models

from server.settings import AUTH_USER_MODEL


def group_chat_profile_file_path(instance, filename):
    return f'user_{instance.creator.id}/chat_avatars/{filename}'


class GroupChat(models.Model):
    name = models.CharField(max_length=50, help_text="Название чата")
    created_at = models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(upload_to=group_chat_profile_file_path, null=True, blank=True)
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
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE)

    def is_role_name_valid(self, role_name: str) -> bool:
        for chat_role in self.CHAT_ROLES:
            if chat_role[0] == role_name:
                return True

        return False


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


class GroupChatRequest(models.Model):
    to_user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="group_request_to_user", default=None)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    changed_at = models.DateTimeField(auto_now=True)
    from_chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, related_name="group_request_from_chat")

    class Meta:
        verbose_name = "Приглашение в чат"
        verbose_name_plural = "Приглашения в чат"
        ordering = ("-created_at",)

    def __str__(self):
        return f"From {self.from_chat} chat to {self.to_user}"
