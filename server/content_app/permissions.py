from rest_framework import permissions

from content_app.services import PostService, CommentService


class PostPermission(permissions.IsAuthenticatedOrReadOnly):
    def has_object_permission(self, request, view, obj):
        service = PostService(obj.id)

        if request.method != "GET" and not service.is_user_owner(request.user):
            return False

        return True


class CommentPermission(permissions.IsAuthenticatedOrReadOnly):
    def has_object_permission(self, request, view, obj):
        service = CommentService(obj)

        if request.method in permissions.SAFE_METHODS:
            return True

        if not service.can_user_delete_comment(request.user):
            return False

        return True
