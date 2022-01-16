from django.db import models

from soc.models_dir.polymorphic import BaseRequest
from server.settings import AUTH_USER_MODEL


class FriendRequest(BaseRequest):
    from_user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="from_user")

    class Meta:
        verbose_name = "Заявка в друзья"
        verbose_name_plural = "Заявки в друзья"
        ordering = ("-created_at",)

    def __str__(self):
        return f"From {self.from_user} to {self.to_user}"

