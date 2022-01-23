from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    SerializerMethodField,
    CurrentUserDefault,
    CharField,
)

from soc.api.services import CreationUser, PersonalChatService
from soc.models import User
from soc.models_dir import (
    user as user_models,
    content as content_models,
    group_chat as group_chat_models,
    personal_chat as personal_chat_models,
    friend as friend_models
)


