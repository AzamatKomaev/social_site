from django.contrib.auth.models import Group

from rest_framework.fields import SerializerMethodField, CharField
from rest_framework.serializers import ModelSerializer

from .models import User, Avatar, FriendRequest
from .services import CreationUser


class UserSerializer(ModelSerializer):
    group_data = SerializerMethodField('get_group_data')
    avatar = SerializerMethodField('get_avatar')

    def get_group_data(self, obj: User) -> dict:
        return GroupSerializer(obj.groups.get()).data

    def get_avatar(self, obj: User):
        return AvatarSerializer(obj.avatar_set.get()).data

    class Meta:
        model = User
        fields = ["id",
                  "username",
                  "email",
                  "group_data",
                  "avatar",
                  "friends"]


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


class AvatarSerializer(ModelSerializer):
    class Meta:
        model = Avatar
        fields = ["image"]


class RegistrationUserSerializer(ModelSerializer):
    password = CharField(min_length=8, max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password"]

    def create(self, validated_data) -> User:
        creation_user = CreationUser(validated_data)
        creation_user.create_user()
        return creation_user.user


class FriendRequestSerializer(ModelSerializer):
    to_user = SerializerMethodField("get_to_user_data")
    from_user = SerializerMethodField("get_from_user_data")

    class Meta:
        model = FriendRequest
        fields = "__all__"

    def get_to_user_data(self, obj: FriendRequest) -> dict:
        return UserSerializer(obj.to_user).data

    def get_from_user_data(self, obj: FriendRequest) -> dict:
        return UserSerializer(obj.from_user).data
