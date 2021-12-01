from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    IntegerField,
    SerializerMethodField,
    CurrentUserDefault,
    CharField,
    EmailField,
)

from soc.api.services import CreationUser
from soc.models import User
from soc.models import Post, Category, Comment, Avatar


class UserSerializer(ModelSerializer):
    """Сериализатор для пользователей сайта."""
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
                  "avatar"]


class GroupSerializer(ModelSerializer):
    """Сериализатор для групп пользователей сайта."""
    class Meta:
        model = Group
        fields = ['name']


class CategorySerializer(ModelSerializer):
    """Сериализатор для категорий."""
    count = SerializerMethodField('get_count_of_posts')

    class Meta:
        model = Category
        fields = '__all__'

    def get_count_of_posts(self, obj) -> int:
        return obj.post_set.all().count()


class PostSerializer(ModelSerializer):
    """Сериализатор для постов."""
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField('get_data_about_user')
    comments = SerializerMethodField('get_comments')

    def get_data_about_user(self, obj: Post) -> dict:
        return UserSerializer(obj.user).data

    def get_comments(self, obj: Post) -> list:
        comments = Comment.objects.filter(post_id=obj.id)
        comments_list = [CommentSerializer(comment).data for comment in comments]
        return comments_list

    class Meta:
        model = Post
        fields = "__all__"



class CommentSerializer(ModelSerializer):
    """Сериализатор для комментариев."""
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")
    text = CharField()

    def get_user_data(self, obj: Comment):
        return UserSerializer(obj.user).data

    class Meta:
        model = Comment
        fields = "__all__"


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
