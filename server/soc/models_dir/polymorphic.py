from django.db import models
from polymorphic.models import PolymorphicModel
from server.settings import AUTH_USER_MODEL


class BaseMessage(PolymorphicModel):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class BaseRequest(PolymorphicModel):
    to_user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="to_user", default=None)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    changed_at = models.DateTimeField(auto_now=True)


