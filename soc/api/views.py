from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator, EmptyPage

from django.db.utils import IntegrityError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from soc.api import serializers
from soc.api.services import accept_password_to_reg
from soc.models import (
    Category,
    Post,
    Comment,
    User,
    Chat
)


class UserJwtAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serilizer = serializers.UserSerializer(request.user)
        return Response(serilizer.data, status=status.HTTP_200_OK)


class UserDetailAPIView(APIView):

    def get(self, request, username: str = None, user_id: int = None):
        user = ""
        try:
            if username is not None:
                user = User.objects.get(username=username)
            elif user_id is not None:
                user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response({"error": "User not found with given data."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


class RegistrationUserAPIView(APIView):
    """Endpoint для регистраций пользователя."""
    def post(self, request):
        serializer = serializers.RegistrationUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AcceptUserAPIView(APIView):
    """Endpoint для подтверждения пользователя."""
    def get(self, request, token: str):
        try:
            accept_password_to_reg(token=token)
        except (ObjectDoesNotExist, NameError):
            return Response({"message": "Token doesnt exists."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Accepted successfully."}, status=status.HTTP_200_OK)


class UserDetailPostAPIView(APIView):

    def get(self, request, user_id: int) -> Response:
        posts = Post.objects.filter(user_id=user_id)
        serializer = serializers.PostSerializer(posts, many=True)
        if not posts:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.data, status=status.HTTP_200_OK)


class ChatListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request) -> Response:
        chats = Chat.objects.filter(users=request.user)
        serializer = serializers.ChatSerializer(chats, many=True)
        return Response(serializer.data)
