from rest_framework.serializers import (
    ModelSerializer, HiddenField,
    CurrentUserDefault, SerializerMethodField,
    ManyRelatedField
)

from user_app.serializers import UserSerializer
from .models import (
    GroupChat, GroupMessage,
    GroupChatRole, GroupChatRequest
)
from .services import GroupChatService


class GroupChatSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    last_message = SerializerMethodField('get_last_message')
    creator = SerializerMethodField('get_creator')

    class Meta:
        model = GroupChat
        fields = '__all__'

    def get_last_message(self, obj: GroupChat) -> dict:
        return GroupMessageSerializer(obj.groupmessage_set.first()).data

    def get_creator(self, obj: GroupChat) -> dict:
        return UserSerializer(obj.creator).data

    def create(self, validated_data):
        if 'avatar' not in validated_data:
            validated_data['avatar'] = None

        chat = GroupChatService.create_chat(**validated_data)
        return chat


class GroupMessageSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = GroupMessage
        fields = "__all__"

    def get_user_data(self, obj: GroupMessage) -> dict:
        return UserSerializer(obj.user).data


class GroupChatRoleSerializer(ModelSerializer):
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = GroupChatRole
        fields = "__all__"

    def get_user_data(self, obj: GroupChatRole):
        return UserSerializer()


class GroupChatMembersSerializer(ModelSerializer):
    user_data = SerializerMethodField('get_user_data')

    def get_user_data(self, obj: GroupChatRole) -> dict:
        return UserSerializer(obj.user).data

    class Meta:
        model = GroupChatRole
        fields = ["id",
                  "user_data",
                  "name",
                  "data_joined"
                  ]


class GroupChatRequestSerializer(ModelSerializer):
    to_user = SerializerMethodField('get_to_user_data')
    from_chat = SerializerMethodField('get_from_chat_data')

    class Meta:
        model = GroupChatRequest
        fields = "__all__"

    def get_to_user_data(self, obj) -> dict:
        return UserSerializer(obj.to_user).data

    def get_from_chat_data(self, obj) -> dict:
        return GroupChatSerializer(obj.from_chat).data


