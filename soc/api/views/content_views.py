from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from django.db.utils import IntegrityError
from django.core.paginator import Paginator, EmptyPage
from django.core.exceptions import ObjectDoesNotExist

from soc.api import serializers
from soc.api.services import accept_password_to_reg, ChatService
from soc.models import (
    Category,
    Post,
    Comment,
    User,
    Chat
)


class CategoryListAPIView(APIView):

    def get(self, request) -> Response:
        categories = Category.objects.all()
        serializer = serializers.CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostListAPIVIew(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, category_id: int):
        try:
            category = Category.objects.get(id=category_id)
        except ObjectDoesNotExist:
            return Response({"error": f"Category {category_id} does not exists."}, status=status.HTTP_404_NOT_FOUND)

        page_number = request.query_params.get('page_number') or 1
        page_size = 30

        posts = Post.objects.filter(category=category)
        paginator = Paginator(posts, page_size)

        try:
            serializer = serializers.PostSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

    def post(self, request, category_id: int):
        serializer = serializers.PostSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return Response({"error": f"Category {category_id} does not exists."}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, category_id: int, post_id: int):
        try:
            post = Post.objects.get(category=category_id, id=post_id)
        except ObjectDoesNotExist:
            return Response({"error": f"Post {post_id} in category {category_id} does not exists."},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, category_id: int, post_id: int) -> Response:
        comments = Comment.objects.filter(post_id=post_id)
        if not comments:
            return Response({"error": f"Comments for post {post_id} in category {category_id} does not exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, category_id: int, post_id: int) -> Response:
        comment_data = {**request.data, **{"post": post_id}}
        serializer = serializers.CommentSerializer(data=comment_data, context={"request": request})

        if serializer.is_valid():
            try:
                serializer.save()
            except ObjectDoesNotExist:
                return Response({"error": f"Post {post_id} does not exists."},
                                status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetailAPIView(APIView):

    def get(self, request, category_id: int, post_id: int, comment_id: int):
        try:
            comment = Comment.objects.get(id=comment_id, post_id=post_id)
        except ObjectDoesNotExist:
            return Response({"error": f"Comment {comment_id} for post {post_id} does not exists."},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)


