from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist

from chat.models import Message, Chat


@database_sync_to_async
def is_user_in_chat(room_name, user):
    return user in Chat.objects.get(name=room_name).users.all()
