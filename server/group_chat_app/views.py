from typing import Dict, Optional

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.paginator import Paginator, EmptyPage

from user_app.models import User
from .models import GroupChat
from .services import GroupChatService, GroupChatRequestService
from .serializers import (
    GroupChatSerializer, GroupMessageSerializer, GroupChatMembersSerializer, GroupChatRequestSerializer
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
                          ) -> Optional[dict]:
    """Function to check Group Chat API Views on general possible errors."""
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
        serializer = GroupChatSerializer(chats, many=True)
        return Response(serializer.data)

    def retrieve(self, request, chat_id: int):
        chat_data = get_chat_by_id(chat_id)
        possible_errors = check_possible_errors(chat_data, chat_id, request)

        if possible_errors['status_code'] != 200:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        chat_serializer = GroupChatSerializer(chat_data['chat'])
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
            serializer = GroupMessageSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

    def list_members(self, request, chat_id: int):
        """The action to get members of group chat."""
        chat_data = get_chat_by_id(chat_id)
        if not chat_data["exists"]:
            return Response({"message": f"Chat with id {chat_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        chat_service = GroupChatService(chat=chat_data['chat'])
        if not chat_service.is_user_member(user=request.user):
            return Response({"message": "You don't have permissions to see this chat."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = GroupChatMembersSerializer(
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

        message_serializer = GroupMessageSerializer(
            data={**request.data, **{"chat": chat_data['chat'].id}},
            context={"request": request}
        )
        if message_serializer.is_valid():
            message_serializer.save()
            return Response(message_serializer.data, status=status.HTTP_201_CREATED)

        return Response(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupChatRequestViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def check_possible_errors(self,
                              request_user: User,
                              user: Optional[User],
                              group_chat_request_service: GroupChatRequestService,
                              group_chat_service: Optional[GroupChatService],
                              ) -> Optional[Dict[str, int]]:
        if not group_chat_request_service.is_user_admin(request_user):
            return {
                "message": "You dont have a permission to do it.",
                "status_code": status.HTTP_403_FORBIDDEN
            }

        if user is not None and group_chat_service.is_user_member(user):
            return {
                "message": "The user already in chat.",
                "status_code": status.HTTP_400_BAD_REQUEST
            }

    def list_requests(self, request, chat_id: int):
        """Action to get list of chat requests by chat id."""
        group_chat_request_service = GroupChatRequestService(chat_id)

        possible_error = self.check_possible_errors(
            request_user=request.user,
            user=None,
            group_chat_request_service=group_chat_request_service,
            group_chat_service=None
        )

        if possible_error:
            return Response({"message": possible_error['message']}, status=possible_error['status_code'])

        all_chat_requests = group_chat_request_service.get_all_chat_requests()
        serializer = GroupChatRequestSerializer(all_chat_requests, many=True)
        return Response(serializer.data)

    def list_user_chat_requests(self, request, user_id: int):
        """Action to get list of chat requests to user by his id."""
        all_user_chat_requests = GroupChatRequestService.get_all_user_chat_requests(user_id)

        if not all_user_chat_requests:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        serializer = GroupChatRequestSerializer(all_user_chat_requests, many=True)
        return Response(serializer.data)

    def detail_request(self, request, chat_id: int, user_id: int):
        """Action to get detail chat request by chat id and user id."""
        group_chat_request_service = GroupChatRequestService(chat_id)
        to_user = get_object_or_404(User, id=user_id)
        request = group_chat_request_service.get_request_or_none(to_user)

        if not request:
            return Response({"message": "Not found: there is not so request"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GroupChatRequestSerializer(request)
        return Response(serializer.data)

    def create(self, request, chat_id: int, user_id: int):
        group_chat_request_service = GroupChatRequestService(chat_id)  # request service
        group_chat_service = GroupChatService(group_chat_request_service.chat)  # chat service

        possible_errors = self.check_possible_errors(
            request_user=request.user,
            user=get_object_or_404(User, id=user_id),
            group_chat_request_service=group_chat_request_service,
            group_chat_service=group_chat_service,
        )

        if possible_errors:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        if group_chat_request_service.is_request_exists(user_id):
            return Response({"message": "Request with this user already exists"}, status=status.HTTP_400_BAD_REQUEST)

        new_chat_request = group_chat_request_service.create_chat_request(user_id)
        serializer = GroupChatRequestSerializer(new_chat_request)
        return Response(serializer.data)

    def update(self, request, chat_id: int):
        group_chat_request_service = GroupChatRequestService(chat_id)  # request service
        chat_request = group_chat_request_service.get_request_or_none(request.user)

        if not chat_request:
            return Response({
                "message": "Not found: request does not exist."
            }, status=status.HTTP_404_NOT_FOUND)

        accepted_chat_request = group_chat_request_service.accept_chat_request(chat_request)
        serializer = GroupChatRequestSerializer(accepted_chat_request)
        return Response(serializer.data)

    def destroy(self, request, chat_id: int, user_id: int):
        group_chat_request_service = GroupChatRequestService(chat_id)

        deleting_request_data = group_chat_request_service.delete_chat_request(request.user, user_id)

        if not deleting_request_data['is_deleted']:
            return Response({"message": deleting_request_data['message']}, status=deleting_request_data['status'])

        return Response({"message": "The chat request was deleted successfully!"}, status.HTTP_204_NO_CONTENT)

