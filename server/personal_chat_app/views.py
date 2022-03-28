from django.core.paginator import Paginator, EmptyPage
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.exceptions import ObjectDoesNotExist

from .models import PersonalChat
from .serializers import (
    PersonalMessageSerializer, PersonalChatSerializer
)
from group_chat_app.services import get_and_sort_chat_list
from .services import PersonalChatService


class PersonalChatModelViewSet(viewsets.ModelViewSet):
    queryset = PersonalChat.objects.all()
    serializer_class = PersonalChatSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_service(self) -> PersonalChatService:
        service = PersonalChatService(self.request.user.username, self.kwargs.get('to_user_username'))
        return service

    def get_queryset(self):
        sort_by, page = self.request.query_params.get('sort_by'), self.request.query_params.get('page')
        queryset = get_and_sort_chat_list(sort_by, self.request, PersonalChat, page)
        return queryset

    def get_object(self):
        service = self.get_service()
        obj = service.get_chat_with_both_users()
        return obj

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
