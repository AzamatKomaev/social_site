from django.contrib.auth.models import User, Group
from rest_framework.serializers import HyperlinkedModelSerializer

from soc.models import Post


class UserSerializer(HyperlinkedModelSerializer):
    """Сериализатор для пользователей сайта."""
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(HyperlinkedModelSerializer):
    """Сериализатор для групп пользователей сайта."""
    class Meta:
        model = Group
        fields = ['url', 'name']


class PostSerializer(HyperlinkedModelSerializer):
    """Сериализатор для постов."""
    class Meta:
        model = Post
        fields = ['url', 'title', 'text', 'created_at']
