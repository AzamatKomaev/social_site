from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from django.db.utils import IntegrityError
from django.core.paginator import Paginator, EmptyPage
from django.core.exceptions import ObjectDoesNotExist

from soc.api import serializers
from soc.api.services import (
    GroupChatService,
    PersonalChatService,
    ChatRequestService
)
from soc.models import (
    GroupChat,
    PersonalChat
)


def get_chat_by_id(chat_id: int) -> dict:
    chat = GroupChat.objects.filter(id=chat_id)
    return {
        "chat": chat.first(),
        "exists": chat.exists()
    }


class GroupChatListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request) -> Response:
        chats = GroupChat.objects.filter(users=request.user)
        serializer = serializers.GroupChatSerializer(chats, many=True)
        return Response(serializer.data)


class PersonalChatListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request) -> Response:
        chats = PersonalChat.objects.filter(users=request.user)
        serializer = serializers.PersonalChatSerializer(
            chats,
            many=True,
            context={"request": request})
        return Response(serializer.data)


class GroupChatDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        if not chat_data["exists"]:
            return Response({"message": f"Chat with id {chat_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        chat_service = GroupChatService(chat=chat_data['chat'])
        if not chat_service.is_user_member(user=request.user):
            return Response({"message": "You don't have permissions to see this chat."},
                            status=status.HTTP_403_FORBIDDEN)

        chat_serializer = serializers.GroupChatSerializer(chat_data['chat'])
        return Response(chat_serializer.data)

    def post(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        if not chat_data['exists']:
            return Response({"message": f"Chat with id {chat_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        chat_service = GroupChatService(chat=chat_data['chat'])
        if not chat_service.is_user_member(user=request.user):
            return Response({"message": "You don't have permissions to see this chat."},
                            status=status.HTTP_403_FORBIDDEN)

        message_serializer = serializers.GroupMessageSerializer(
            data={**request.data, **{"chat": chat_data['chat'].id}},
            context={"request": request}
        )

        if message_serializer.is_valid():
            message_serializer.save()
            return Response(message_serializer.data, status=status.HTTP_201_CREATED)

        return Response(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupMessageListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        if not chat_data["exists"]:
            return Response({"message": f"Chat with id {chat_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        chat_service = GroupChatService(chat=chat_data['chat'])
        if not chat_service.is_user_member(user=request.user):
            return Response({"message": "You don't have permissions to see this chat."},
                            status=status.HTTP_403_FORBIDDEN)

        page_number = request.query_params.get('page_number') or 1
        page_size = 15
        paginator = Paginator(chat_service.get_chat_messages(), page_size)

        try:
            serializer = serializers.GroupMessageSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)


class GroupChatMemberListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        if not chat_data["exists"]:
            return Response({"message": f"Chat with id {chat_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        chat_service = GroupChatService(chat=chat_data['chat'])
        if not chat_service.is_user_member(user=request.user):
            return Response({"message": "You don't have permissions to see this chat."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = serializers.GroupChatMembersSerializer(
            chat_service.chat.groupchatrole_set.all(),
            many=True,
            context={"chat_id": chat_id}
        )
        return Response(serializer.data)


class PersonalChatDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, to_user_username: str):
        try:
            chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
            if not chat_service.is_chat_exists():
                chat_service.create()
                return Response({"message": f"Chat was created successfully."})
        except ObjectDoesNotExist:
            return Response({"error": f"User with username {to_user_username} is not exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PersonalChatSerializer(
            chat_service.get_chat_with_both_users(),
            context={"request": request}
            )
        return Response(serializer.data)


class PersonalMessageListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, to_user_username: str):
        chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
        if not chat_service.is_chat_exists():
            return Response({"message": f"Chat with {to_user_username} doesnt exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PersonalMessageSerializer(chat_service.get_messages(), many=True)
        return Response(serializer.data)

    def post(self, request, to_user_username: str):
        chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
        if not chat_service.is_chat_exists():
            return Response({"message": f"Chat with {to_user_username} doesnt exists."}, status=status.HTTP_404_NOT_FOUND)

        message_serializer = serializers.PersonalMessageSerializer(
            data={**request.data, **{"chat": chat_service.get_chat_with_both_users().id}},
            context={"request": request}
        )

        if message_serializer.is_valid():
            message_serializer.save()
            return Response(message_serializer.data, status=status.HTTP_201_CREATED)

        return Response(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatRequestAPIView(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request, chat_id: int):
        if "to_user" not in request.query_params:
            return Response({"message": "Bad request: not found to_user in params."}, status=status.HTTP_400_BAD_REQUEST)

        chat_request_service = ChatRequestService(chat_id=chat_id)
        chat_request = chat_request_service.get_chat_request(user_id=request.query_params['to_user'])

        if not chat_request:
            return Response({"message": "Not found chat request with given data."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ChatRequestSerializer(chat_request)
        return Response(serializer.data)
