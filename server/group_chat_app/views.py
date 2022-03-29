from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, viewsets, generics

from user_app.models import User
from .models import GroupChat, GroupChatRole, GroupChatRequest, GroupMessage
from .paginators import MessagePagination
from .services import GroupChatRequestService, get_and_sort_chat_list, get_group_chat_serializer_data
from .serializers import (
    GroupChatSerializer, GroupMessageSerializer,
    GroupChatRequestSerializer, GroupChatRoleSerializer
)
from .permissions import GroupChatPermission, GroupChatRolePermission, GroupChatRequestPermission, \
    GroupChatRequestListPermission
from . import exceptions


class GroupChatModelViewSet(viewsets.ModelViewSet):
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer
    permission_classes = (GroupChatPermission, )

    def get_object(self):
        obj = get_object_or_404(self.queryset.model, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        sort_by = self.request.query_params.get('sort_by', None)
        page = self.request.query_params.get('page', None)
        return get_and_sort_chat_list(sort_by, self.request, self.queryset.model, page)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=get_group_chat_serializer_data(request))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GroupMessageModelViewSet(viewsets.ModelViewSet):
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer
    permission_classes = (GroupChatPermission, GroupChatRolePermission)
    pagination_class = MessagePagination


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
        serializer = self.get_serializer(new_chat_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        service = GroupChatRequestService(kwargs.get('chat_id'))
        instance = service.get_request(request.user)
        accepted_chat_request = service.accept_chat_request(instance)
        serializer = self.get_serializer(accepted_chat_request)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        request_service = GroupChatRequestService(kwargs.get('chat_id'))
        request_service.delete_chat_request(request.user, kwargs.get('user_id'))
        return Response({"message": "The chat request was deleted successfully!"}, status.HTTP_204_NO_CONTENT)


class GroupChatRoleModelViewSet(viewsets.ModelViewSet):
    serializer_class = GroupChatRoleSerializer
    queryset = GroupChatRole.objects.all()
    permission_classes = (GroupChatRolePermission, )

    def get_object(self):
        obj = get_object_or_404(GroupChatRole, user_id=self.kwargs.get('user_id'), chat_id=self.kwargs.get('chat_id'))
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset().filter(chat_id=self.kwargs.get('chat_id'))

    def update(self, request, *args, **kwargs):
        role_name = request.data.get('role_name', 'Участник')
        obj = self.get_object()

        if not obj.is_role_name_valid(role_name):
            raise exceptions.InvalidRoleName()

        obj.name = role_name
        obj.save()
        serializer = self.get_serializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)
