from rest_framework.fields import (
    CurrentUserDefault, SerializerMethodField, HiddenField
)
from rest_framework.serializers import ModelSerializer
from .models import PersonalChat, PersonalMessage
from user_app.serializers import UserSerializer


class PersonalMessageSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = PersonalMessage
        fields = "__all__"

    def get_user_data(self, obj: PersonalMessage) -> dict:
        return UserSerializer(obj.user).data


class PersonalChatSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    last_message = SerializerMethodField('get_last_message')
    interlocutor = SerializerMethodField('get_interlocutor')
    messages_count = SerializerMethodField('get_messages_count')

    class Meta:
        model = PersonalChat
        fields = "__all__"

    def get_last_message(self, obj: PersonalChat) -> dict:
        return PersonalMessageSerializer(obj.personalmessage_set.all().first()).data

    def get_interlocutor(self, obj: PersonalChat) -> dict:
        return UserSerializer(PersonalChatService.get_interlocutor(
            personal_chat=obj,
            user=self.context['request'].user
        )).data

    def get_messages_count(self, obj: PersonalChat) -> int:
        return len(obj.personalmessage_set.all())
