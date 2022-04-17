from django.contrib.auth.models import Group

from rest_framework.fields import SerializerMethodField, CharField
from rest_framework.serializers import ModelSerializer

from .models import User, FriendRequest
from .services import CreationUser


class UserSerializer(ModelSerializer):
    group_data = SerializerMethodField('get_group_data')
    friends_count = SerializerMethodField('get_friends_count')
    posts_count = SerializerMethodField('get_posts_count')
    comments_count = SerializerMethodField('get_comments_count')

    def get_group_data(self, obj: User) -> dict:
        return GroupSerializer(obj.groups.get()).data

    def get_friends_count(self, obj: User) -> int:
        return obj.user_set.count()

    def get_posts_count(self, obj: User) -> int:
        return obj.post_set.count()

    def get_comments_count(self, obj: User) -> int:
        return obj.comment_set.count()

    class Meta:
        model = User
        fields = ["id",
                  "username",
                  "email",
                  "group_data",
                  "avatar",
                  "friends",
                  "posts_count",
                  "comments_count",
                  "friends_count"]


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


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
