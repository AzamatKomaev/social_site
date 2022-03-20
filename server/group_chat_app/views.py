from typing import Dict, Optional

from django.core.paginator import Paginator, EmptyPage
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets, generics

from user_app.models import User
from .models import GroupChat, GroupChatRole, GroupChatRequest
from .services import (
    GroupChatService, GroupChatRequestService, GroupChatRoleService,
    get_and_sort_chat_list
)
from .serializers import (
    GroupChatSerializer, GroupMessageSerializer,
    GroupChatMembersSerializer, GroupChatRequestSerializer, GroupChatRoleSerializer
)
from .permissions import GroupChatPermission, GroupChatRolePermission, GroupChatRequestPermission, \
    GroupChatRequestListPermission


def get_chat_by_id(chat_id: int) -> dict:
    chat = GroupChat.objects.filter(id=chat_id)
    return {
        "chat": chat.first(),
        "exists": chat.exists()
    }

class GroupChatModelViewSet(viewsets.ModelViewSet):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer
    permission_classes = (GroupChatPermission, )

    def _get_serializer_data(self, request):
        serializer_data = {
            "name": request.data.get('name', None),
            "users": [request.user.id]
        }
        if 'avatar' in request.data:
            serializer_data = {**serializer_data, "avatar": request.data['avatar']}

        return serializer_data


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=self._get_serializer_data(request))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GroupChatViewSet(viewsets.ViewSet):
    permission_classes = (GroupChatPermission, )
    queryset = GroupChat.objects.all()

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
            "users": [request.user.id]
        }

        if 'avatar' in request.data:
            data_for_serializer = {**data_for_serializer, "avatar": request.data['avatar']}

        serializer = GroupChatSerializer(data=data_for_serializer, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, chat_id: int):
        chat = get_object_or_404(GroupChat, id=chat_id)
        chat_service = GroupChatService(chat)

        if not chat_service.is_user_admin(request.user):
            return Response({"text": "You dont have permission to do it."}, status=status.HTTP_403_FORBIDDEN)

        chat_service.delete_chat()
        return Response({"text": "The chat was deleted successfully!"}, status=status.HTTP_200_OK)


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


class GroupChatRequestListAPIView(generics.ListAPIView):
    queryset = GroupChatRequest.objects.all()
    serializer_class = GroupChatRequestSerializer
    permission_classes = (GroupChatRequestListPermission, )

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        chat_requests = GroupChatRequestService.get_all_user_chat_requests(user_id)
        return chat_requests


class GroupChatRequestModelViewSet(viewsets.ModelViewSet):
    queryset = GroupChatRequest.objects.all()
    serializer_class = GroupChatRequestSerializer
    permission_classes = (GroupChatRequestPermission,)

    def get_queryset(self):
        chat_id = self.kwargs.get('chat_id')
        service = GroupChatRequestService(chat_id)
        return service.get_all_chat_requests()

    def get_object(self):
        chat_id = self.kwargs.get('chat_id')
        user_id = self.kwargs.get('user_id')

        service = GroupChatRequestService(chat_id)
        to_user = get_object_or_404(User, id=user_id)
        chat_request = service.get_request(to_user)
        return chat_request

    def create(self, request, *args, **kwargs):
        request_service = GroupChatRequestService(kwargs.get('chat_id'))
        new_chat_request = request_service.create_chat_request(kwargs.get('user_id'))
        serializer = GroupChatRequestSerializer(new_chat_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        service = GroupChatRequestService(kwargs.get('chat_id'))
        instance = service.get_request(request.user)
        accepted_chat_request = service.accept_chat_request(instance)
        serializer = self.get_serializer(accepted_chat_request)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        request_service = GroupChatRequestService(kwargs.get('chat_id'))
        request_service.delete_chat_request(request.user, kwargs.get('user_id'))
        return Response({"message": "The chat request was deleted successfully!"}, status.HTTP_204_NO_CONTENT)


class GroupChatRoleModelViewSet(viewsets.ModelViewSet):
    serializer_class = GroupChatRoleSerializer
    queryset = GroupChatRole.objects.all()
    permission_classes = (GroupChatRolePermission, )

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset().filter(chat_id=self.kwargs.get('pk'))
