import logging

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_418_IM_A_TEAPOT
)

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response

from soc.models import Post
from soc_api.serializers import PostSerializer, UserSerializer
from soc_api.service.content_service import PostService, UserService


logger = logging.getLogger(__name__)


class PostList(APIView):
    """endpoint для отображения списка постов."""
    permission_classes = [IsAuthenticated]

    def get(self, request) -> Response:
        post_service = PostService(request)
        serializer = post_service.get_serializer()
        if serializer == False:
            return Response({"error": "Ежедневный лимит токена превысил норму."}, status=HTTP_418_IM_A_TEAPOT)

        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request) -> Response:
        post_service = PostService(request)
        serializer = post_service.get_serializer()
        if serializer == False:
            return Response({"error": "Ежедневный лимит токена превысил норму."}, status=HTTP_418_IM_A_TEAPOT)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    """endpoint для подробного отображения поста по его id."""

    def get(self, request, pk: int) -> Response:
        post_service = PostService(request)
        try:
            serializer = post_service.get_detail_serializer(pk)
            if serializer == False:
                return Response({"error": "Ежедневный лимит токена превысил норму."}, status=HTTP_418_IM_A_TEAPOT)

            return Response(serializer.data, status=HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": f"Пост с id {pk} не существует."}, status=HTTP_404_NOT_FOUND)


class UserList(APIView):
    """endpoint для отображения списка юзеров."""
    permission_classes = [IsAdminUser]

    def get(self, request) -> Response:
        user_service = UserService(request)
        serializer = user_service.get_serializer()
        if serializer == False:
            return Response({"error": "Ежедневный лимит токена превысил норму."}, status=HTTP_418_IM_A_TEAPOT)

        return Response(serializer.data, status=HTTP_200_OK)


class UserDetail(APIView):
    """endpoint для подробного отображения юзера по его юзернейму."""
    permission_classes = [IsAdminUser]

    def get(self, request, username: str) -> Response:
        user_service = UserService(request)
        try:
            serializer = user_service.get_detail_serializer(username)
            if serializer == False:
                return Response({"error": "Ежедневный лимит токена превысил норму."}, status=HTTP_418_IM_A_TEAPOT)

            return Response(serializer.data, status=HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": f"Пользователь с именем {username} не существует."}, status=HTTP_404_NOT_FOUND)
