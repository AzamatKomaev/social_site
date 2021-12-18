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

