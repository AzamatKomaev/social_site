from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.exceptions import ObjectDoesNotExist

from .models import PersonalChat
from .serializers import (
    PersonalMessageSerializer, PersonalChatSerializer
)
from .services import PersonalChatService


class PersonalChatViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        chats = PersonalChat.objects.filter(users=request.user)
        serializer = PersonalChatSerializer(
            chats,
            many=True,
            context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, to_user_username: str):
        try:
            chat_service = PersonalChatService(from_user_username=request.user.username,
                                               to_user_username=to_user_username)
            if not chat_service.is_chat_exists():
                chat_service.create()
                return Response({"message": f"Chat was created successfully."})
        except ObjectDoesNotExist:
            return Response({"error": f"User with username {to_user_username} is not exists."},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = PersonalChatSerializer(
            chat_service.get_chat_with_both_users(),
            context={"request": request}
        )
        return Response(serializer.data)

    def create(self, request, to_user_username: str):
        chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
        if chat_service.is_chat_exists():
            return Response({"message": "Bad request: chat with this user already exists."},
                            status=status.HTTP_400_BAD_REQUEST)

        new_chat = chat_service.create()
        if not new_chat:
            return Response({"message": "Bad request: cannot create personal chat with this user."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = PersonalChatSerializer(new_chat, context={'request': request})
        return Response(serializer.data)


class PersonalMessageViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, to_user_username: str):
        chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
        if not chat_service.is_chat_exists():
            return Response({"message": f"Chat with {to_user_username} doesnt exists."},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = PersonalMessageSerializer(chat_service.get_messages(), many=True)
        return Response(serializer.data)

    def create(self, request, to_user_username: str):
        chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
        if not chat_service.is_chat_exists():
            return Response({"message": f"Chat with {to_user_username} doesnt exists."},
                            status=status.HTTP_404_NOT_FOUND)

        message_serializer = PersonalMessageSerializer(
            data={**request.data, **{"chat": chat_service.get_chat_with_both_users().id}},
            context={"request": request}
        )

        if message_serializer.is_valid():
            message_serializer.save()
            return Response(message_serializer.data, status=status.HTTP_201_CREATED)

        return Response(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
