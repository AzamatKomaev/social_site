from django.contrib.auth.models import User, Group

from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    IntegerField,
    CurrentUserDefault,
)

from soc.models import Post, Category


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


class CategorySerializer(ModelSerializer):
    """Сериализатор для категорий."""
    class Meta:
        model = Category
        fields = '__all__'


class PostSerializer(ModelSerializer):
    """Сериализатор для постов."""
    user = HiddenField(default=CurrentUserDefault())
    category_id = IntegerField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'created_at', 'user', 'user_id',
                                                               'category_id']
