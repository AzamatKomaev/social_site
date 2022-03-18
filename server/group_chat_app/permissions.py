from rest_framework import permissions
from rest_framework.request import Request

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
