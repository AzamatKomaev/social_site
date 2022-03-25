from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets, mixins
from django.shortcuts import get_object_or_404

from .paginators import PostPagination
from .permissions import PostPermission, CommentPermission
from .serializers import (
    PostSerializer,
    CommentSerializer,
    CategorySerializer
)
from .models import Category, Comment, Post
from .services import CommentService


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

    def get_object(self):
        obj = get_object_or_404(Post, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        queryset = Post.objects.filter(category_id=self.kwargs.get('category_id'))
        return queryset


class CommentModelViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (CommentPermission, )

    def get_queryset(self):
        queryset = Comment.objects.filter(post_id=self.kwargs.get('post_id'))
        return queryset

    def get_object(self):
        obj = get_object_or_404(Comment, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj
