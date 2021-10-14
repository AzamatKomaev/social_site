import logging

from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response

from soc.models import Post
from soc_api.serializers import PostSerializer, UserSerializer


logger = logging.getLogger(__name__)


class PostList(APIView):
    """endpoint для отображения списка постов."""
    permission_classes = [IsAuthenticated]

    def get(self, request) -> Response:
        posts = Post.objects.all().order_by('-id')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request) -> Response:
        data = JSONParser().parse(request)
        logger.info(data)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)


class PostDetail(APIView):
    """endpoint для подробного отображения поста по его id."""
    def get(self, request, pk: int) -> Response:
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"message": "Post is not being with this id"}, status=HTTP_404_NOT_FOUND)

        serializer = PostSerializer(post)
        return Response(serializer.data, status=HTTP_200_OK)


class UserList(APIView):
    """endpoint для отображения списка юзеров."""
    permission_classes = [IsAdminUser]

    def get(self, request) -> Response:
        users = User.objects.all().order_by('-id')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class UserDetail(APIView):
    """endpoint для подробного отображения юзера по его юзернейму."""
    permission_classes = [IsAdminUser]

    def get(self, request, username: str) -> Response:
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"message": "User is not being with this username"}, status=HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=HTTP_200_OK)
