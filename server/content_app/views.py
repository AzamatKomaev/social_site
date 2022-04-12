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
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PostModelViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (PostPermission, )
    pagination_class = PostPagination
    filterset_class = PostFilter

    def get_object(self):
        obj = get_object_or_404(Post, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        return super().get_queryset()


class CommentModelViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (CommentPermission, )
    filterset_class = CommentFilter

    def get_object(self):
        obj = get_object_or_404(Comment, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj
