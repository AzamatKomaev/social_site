from django.shortcuts import get_object_or_404
from rest_framework import permissions

from group_chat_app.models import GroupChat
from group_chat_app.services import GroupChatService, GroupChatRequestService, GroupChatRoleService
from user_app.models import User
from .exceptions import ChatRequestAlreadyExists, ChatRequestDoesNotExist


class GroupChatPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        service = GroupChatService(obj)
        if not service.is_user_member(request.user):
            return False

        if request.method not in permissions.SAFE_METHODS and not service.is_user_admin(request.user):
            return False

        return True


class GroupChatRolePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        service = GroupChatRoleService(obj)
        is_admin = service.is_user_admin(request.user)

        # if request.method == "DELETE" and (request.user == obj.user or is_admin):
        #     """If request user own the role or request user is admin."""
        #     return True

        if request.method not in permissions.SAFE_METHODS and not is_admin:
            return False

        return True

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        chat_id = int(request.path.split('/')[4])
        service = GroupChatService(get_object_or_404(GroupChat, pk=chat_id))

        if not service.is_user_member(request.user):
            return False

        return True


class GroupChatRequestListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        user_id = int(request.path.split('/')[4])
        user = get_object_or_404(User, pk=user_id)

        if user != request.user:
            return False

        return True


class GroupChatRequestPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        if view.action in ['create', 'retrieve', 'destroy']:
            chat_id = int(request.path.split('/')[4])
            user_id = int(request.path.split('/')[6])
            chat = get_object_or_404(GroupChat, pk=chat_id)
            user = get_object_or_404(User, pk=user_id)
            chat_service = GroupChatService(chat)
            request_service = GroupChatRequestService(chat.id)

            if view.action in ['retrieve', 'destroy']:
                if not request_service.is_request_exists(user.id):
                    raise ChatRequestDoesNotExist

                if not (
                        (request.user == user and request_service.is_user_receiver(user)) or
                        (chat_service.is_user_admin(request.user))
                ):
                    return False

            if view.action == 'create':
                if request_service.is_request_exists(user.id):
                    raise ChatRequestAlreadyExists

                if not chat_service.is_user_admin(request.user):
                    return False

                return True


        return True
