from django.core.paginator import Paginator, EmptyPage
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.exceptions import ObjectDoesNotExist

from .models import PersonalChat
from .serializers import (
    PersonalMessageSerializer, PersonalChatSerializer
)
from group_chat_app.services import get_and_sort_chat_list
from .services import PersonalChatService


class PersonalChatViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        sort_by = request.query_params.get('sort_by', None)
        page = request.query_params.get('page', 0)
        chat_data = get_and_sort_chat_list(sort_by, request, PersonalChat, PersonalChatSerializer, page)
        return Response(chat_data['list'], status=chat_data['status_code'])

    def retrieve(self, request, to_user_username: str):
        try:
            chat_service = PersonalChatService(from_user_username=request.user.username,
                                               to_user_username=to_user_username)
            if not chat_service.is_chat_exists():
                new_chat = chat_service.create()
                serializer = PersonalChatSerializer(
                    new_chat,
                    context={"request": request}
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)

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

        page_number = request.query_params.get('page_number') or 1
        page_size = 15
        paginator = Paginator(chat_service.get_messages(), page_size)

        try:
            serializer = PersonalMessageSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

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
