from typing import Union

from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.paginator import Paginator, EmptyPage
from django.core.exceptions import ObjectDoesNotExist

from soc.api import serializers
from ..services import (
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


def check_possible_errors(chat_data: dict,
                          chat_id: int,
                          request
                          ) -> Union[dict, None]:
    """Function to check Group Chat API Views on general posible errors."""
    if not chat_data["exists"]:
        return {
            "message": f"Chat with id {chat_id} not found.",
            "status_code": status.HTTP_404_NOT_FOUND
        }

    chat_service: GroupChatService = GroupChatService(chat=chat_data['chat'])
    if not chat_service.is_user_member(user=request.user):
        return {
            "message": "You don't have permissions to see this chat.",
            "status_code": status.HTTP_403_FORBIDDEN
        }

    return {
        "chat_service": chat_service,
        "status_code": status.HTTP_200_OK
    }


class GroupChatViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        chats = GroupChat.objects.filter(users=request.user)
        serializer = serializers.GroupChatSerializer(chats, many=True)
        return Response(serializer.data)

    def retrieve(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        possible_errors = check_possible_errors(chat_data, chat_id, request)

        if possible_errors['status_code'] != 200:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        chat_serializer = serializers.GroupChatSerializer(chat_data['chat'])
        return Response(chat_serializer.data)

    def list_message(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        possible_errors = check_possible_errors(chat_data, chat_id, request)

        if possible_errors['status_code'] != 200:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        page_number = request.query_params.get('page_number') or 1
        page_size = 15
        paginator = Paginator(possible_errors['chat_service'].get_chat_messages(), page_size)

        try:
            serializer = serializers.GroupMessageSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

    def list_members(self, request, chat_id):
        """The action to get members of group chat."""
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

    def create_message(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        possible_errors = check_possible_errors(chat_data, chat_id, request)

        if possible_errors['status_code'] != 200:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        message_serializer = serializers.GroupMessageSerializer(
            data={**request.data, **{"chat": chat_data['chat'].id}},
            context={"request": request}
        )
        if message_serializer.is_valid():
            message_serializer.save()
            return Response(message_serializer.data, status=status.HTTP_201_CREATED)

        return Response(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PersonalChatViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        chats = PersonalChat.objects.filter(users=request.user)
        serializer = serializers.PersonalChatSerializer(
            chats,
            many=True,
            context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, to_user_username: str):
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

    def list_message(self, request, to_user_username: str):
        chat_service = PersonalChatService(from_user_username=request.user.username, to_user_username=to_user_username)
        if not chat_service.is_chat_exists():
            return Response({"message": f"Chat with {to_user_username} doesnt exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PersonalMessageSerializer(chat_service.get_messages(), many=True)
        return Response(serializer.data)

    def create_message(self, request, to_user_username: str):
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

    def check_possible_errors(self,
                              request,
                              chat_id: int) -> dict:
        if "to_user" not in request.query_params:
            return {
                "message": "Bad request: not found to_user in params.",
                "status_code": status.HTTP_400_BAD_REQUEST
            }

        chat_request_service = ChatRequestService(chat_id=chat_id)
        chat_request = chat_request_service.get_chat_request(user_id=request.query_params['to_user'])

        if not chat_request:
            return {
                "message": "Not found chat request with given data.",
                "status_code": status.HTTP_404_NOT_FOUND
            }

        serializer = serializers.ChatRequestSerializer(chat_request)
        return {
            "message": serializer.data,
            "status_code": status.HTTP_200_OK
        }

    def get(self, request, chat_id: int):
        data = self.check_possible_errors(request, chat_id)
        return Response(data["message"], status=data["status_code"])
