from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.shortcuts import get_object_or_404

from .paginators import PostPagination
from .permissions import PostPermission
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
    permission_classes = (PostPermission, )
    pagination_class = PostPagination

    def get_object(self):
        obj = get_object_or_404(Post, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        queryset = Post.objects.filter(category_id=self.kwargs.get('category_id'))
        return queryset


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
