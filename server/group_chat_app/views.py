from typing import Dict, Optional
from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.paginator import Paginator, EmptyPage

from user_app.models import User
from .models import GroupChat
from .services import (
    GroupChatService, GroupChatRequestService, GroupChatRoleService,
    get_and_sort_chat_list
)
from .serializers import (
    GroupChatSerializer, GroupMessageSerializer,
    GroupChatMembersSerializer, GroupChatRequestSerializer
)


def get_chat_by_id(chat_id: int) -> dict:
    chat = GroupChat.objects.filter(id=chat_id)
    return {
        "chat": chat.first(),
        "exists": chat.exists()
    }


class GroupChatViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        sort_by = request.query_params.get('sort_by', None)
        page = request.query_params.get('page', None)
        chat_data = get_and_sort_chat_list(sort_by, request, GroupChat, GroupChatSerializer, page)
        return Response(chat_data['list'], status=chat_data['status_code'])

    def retrieve(self, request, chat_id: int):
        chat = get_object_or_404(GroupChat, id=chat_id)
        chat_serializer = GroupChatSerializer(chat)
        return Response(chat_serializer.data)

    def create(self, request):
        data_for_serializer = {
            "name": request.data.get('name', None),
            "creator": request.user.id,
            "users": [request.user.id]
        }

        if 'avatar' in request.data:
            data_for_serializer = {**data_for_serializer, "avatar": request.data['avatar']}

        serializer = GroupChatSerializer(data=data_for_serializer, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupMessageViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, chat_id: int):
        page_number = request.query_params.get('page_number') or 1
        page_size = 15

        chat = get_object_or_404(GroupChat, id=chat_id)
        chat_service = GroupChatService(chat)

        paginator = Paginator(chat_service.get_chat_messages(), page_size)

        try:
            serializer = GroupMessageSerializer(paginator.page(page_number), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except EmptyPage:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

    def create(self, request, chat_id: int):
        chat = get_object_or_404(GroupChat, id=chat_id)

        message_serializer = GroupMessageSerializer(
            data={**request.data, **{"chat": chat.id}},
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
        chat_request = group_chat_request_service.get_request_or_none(to_user)

        if not chat_request:
            return Response({"message": "Not found: there is no so request"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GroupChatRequestSerializer(chat_request)
        return Response(serializer.data)

    def create(self, request, chat_id: int, user_id: int):
        group_chat_request_service = GroupChatRequestService(chat_id)  # request service
        group_chat_service = GroupChatService(group_chat_request_service.chat)  # chat service

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


class GroupChatRoleViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, chat_id: int):
        """The action to get members of group chat."""
        chat = get_object_or_404(GroupChat, id=chat_id)
        chat_service = GroupChatService(chat=chat)

        serializer = GroupChatMembersSerializer(
            chat_service.chat.groupchatrole_set.all(),
            many=True,
            context={"chat_id": chat_id}
        )
        return Response(serializer.data)

    def update(self, request, chat_id: int):
        user_id, role = request.data.get('user_id', None), request.data.get('role', None)

        if not (user_id and role):
            return Response({"message": "Bad request: there is no necessary data in request body."},
                            status=status.HTTP_400_BAD_REQUEST)

        chat_role_service = GroupChatRoleService(chat_id, user_id)
