from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.shortcuts import get_object_or_404

from .paginators import PostPagination
from .serializers import (
    PostSerializer,
    CommentSerializer,
    CategorySerializer
)
from .models import Category, Comment, Post
from .services import PostService, CommentService


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PostModelViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    pagination_class = PostPagination

    def get_queryset(self):
        queryset = Post.objects.filter(category_id=self.kwargs.get('category_id'))
        return queryset


class PostViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, category_id: int):
        page_size = 30
        serializer = PostService.get_paginated_post_list(category_id, request, page_size)

        if not serializer:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, post_id: int):
        post = get_object_or_404(Post, id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, post_id):
        post_service = PostService(post_id)
        if not post_service.is_user_owner(request.user):
            return Response({'message': 'You dont have a permission to do it.'}, status=status.HTTP_403_FORBIDDEN)

        post_service.delete()
        return Response({'message': 'The post was deleted successfully!'}, status=status.HTTP_200_OK)

    def create(self, request, category_id: int):
        serializer_data = PostService.create(request)
        if not serializer_data:
            return Response({"error": f"Category {category_id} does not exists."}, status=status.HTTP_400_BAD_REQUEST)

        if not serializer_data['is_valid']:
            return Response(serializer_data['serializer'].errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_data['serializer'].data, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request, post_id: int):
        comment_service = CommentService(post_id)
        serializer = comment_service.get_list()
        return Response(serializer.data)

    def retrieve(self, request, comment_id: int):
        comment = get_object_or_404(Comment, id=comment_id)
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, post_id: int):
        comment_service = CommentService(post_id)
        serializer_data = comment_service.create(request)

        if not serializer_data:
            return Response({"error": f"Post {post_id} does not exists."}, status=status.HTTP_400_BAD_REQUEST)

        if not serializer_data['is_valid']:
            return Response(serializer_data['serializer'].errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_data['serializer'].data, status=status.HTTP_201_CREATED)
