from rest_framework import viewsets, mixins, generics
from django.shortcuts import get_object_or_404

from .paginators import PostPagination
from .permissions import PostPermission, CommentPermission
from .serializers import (
    PostSerializer,
    CommentSerializer,
    CategorySerializer
)
from .models import Category, Comment, Post
from .filters import PostFilter, CommentFilter


class CategoryListRetrieveView(mixins.ListModelMixin,
                               mixins.RetrieveModelMixin,
                               viewsets.GenericViewSet):
    queryset = Category.objects.prefetch_related('post_set').all()
    serializer_class = CategorySerializer


class PostModelViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('user').prefetch_related(
        'user__friends',
        'comment_set',
        'comment_set__user',
        'user__groups',
        'user__post_set',
        'user__comment_set',
        'user__user_set'
    )

    serializer_class = PostSerializer
    permission_classes = (PostPermission,)
    pagination_class = PostPagination
    filterset_class = PostFilter

    def get_object(self):
        obj = get_object_or_404(Post.objects.select_related('user'), pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        return super().get_queryset()


class CommentModelViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related('user').prefetch_related(
        'user__post_set', 'user__comment_set', 'user__friends', 'user__user_set'
    )
    serializer_class = CommentSerializer
    permission_classes = (CommentPermission,)
    filterset_class = CommentFilter

    def get_object(self):
        obj = get_object_or_404(Comment, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj
