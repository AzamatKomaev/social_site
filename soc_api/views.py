from django.contrib.auth.models import User, Group
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from soc_api.serializers import UserSerializer, GroupSerializer, PostSerializer
from soc.models import Post


class UserViewSet(ModelViewSet):
    """"endpoint для отображения пользователей."""
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(ModelViewSet):
    """endpoint для отображения групп."""
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PostViewSet(ModelViewSet):
    """endpount для отображения постов."""
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permissions_classes = [permissions.IsAuthenticated]
