from django.contrib.auth.models import User, Group
from rest_framework.serializers import ModelSerializer, HiddenField, CurrentUserDefault

from soc.models import Post


class UserSerializer(ModelSerializer):
    """Сериализатор для пользователей сайта."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class GroupSerializer(ModelSerializer):
    """Сериализатор для групп пользователей сайта."""
    class Meta:
        model = Group
        fields = ['id', 'name']


class PostSerializer(ModelSerializer):
    """Сериализатор для постов."""
    user = HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Post
        fields = ['user', 'id', 'title', 'text', 'created_at', 'user_id']
