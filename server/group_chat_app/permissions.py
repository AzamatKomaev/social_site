from django.shortcuts import get_object_or_404
from rest_framework import permissions

from group_chat_app.models import GroupChat
from group_chat_app.services import GroupChatService


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
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        chat_id = int(request.path.split('/')[4])
        service = GroupChatService(get_object_or_404(GroupChat, pk=chat_id))

        if not service.is_user_member(request.user):
            return False

        return True

    def has_object_permission(self, request, view, obj):
        print('i was')
        if not request.user.is_authenticated:
            return False

        return True
