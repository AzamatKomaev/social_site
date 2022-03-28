from django.core.paginator import Paginator, EmptyPage
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from group_chat_app.services import get_and_sort_chat_list
from group_chat_app.paginators import MessagePagination
from .services import PersonalChatService
from .models import PersonalChat, PersonalMessage
from .serializers import (
    PersonalMessageSerializer, PersonalChatSerializer
)


class PersonalBase:
    def get_service(self) -> PersonalChatService:
        service = PersonalChatService(self.request.user.username, self.kwargs.get('to_user_username'))
        return service

    def get_object(self):
        service = self.get_service()
        obj = service.get_chat_with_both_users()
        return obj


class PersonalChatModelViewSet(PersonalBase, viewsets.ModelViewSet):
    queryset = PersonalChat.objects.all()
    serializer_class = PersonalChatSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        sort_by, page = self.request.query_params.get('sort_by'), self.request.query_params.get('page')
        queryset = get_and_sort_chat_list(sort_by, self.request, PersonalChat, page)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        """
        Action for getting a user chat.
        If a user chat with to_user does not exist this creates a chat."""
        service = self.get_service()
        status_code: int

        try:
            chat = self.get_object()
            serializer, status_code = self.get_serializer(chat), status.HTTP_200_OK
        except Http404:
            new_chat = service.create()
            serializer, status_code = self.get_serializer(new_chat), status.HTTP_201_CREATED

        return Response(serializer.data, status=status_code)


class PersonalMessageModelViewSet(viewsets.ModelViewSet):
    queryset = PersonalMessage.objects.all()
    serializer_class = PersonalMessageSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = MessagePagination

    def get_service(self) -> PersonalChatService:
        service = PersonalChatService(self.request.user.username, self.kwargs.get('to_user_username'))
        return service

    def get_queryset(self):
        service = self.get_service()
        return service.get_messages()

    def create(self, request, *args, **kwargs):
        service = self.get_service()
        chat = service.get_chat_with_both_users()
        data = {**request.data, **{"chat": chat.id}}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
