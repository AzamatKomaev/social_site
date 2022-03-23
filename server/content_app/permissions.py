from rest_framework.permissions import IsAuthenticatedOrReadOnly

from content_app.services import PostService


class PostPermission(IsAuthenticatedOrReadOnly):
    def has_object_permission(self, request, view, obj):
        service = PostService(obj.id)

        if request.method != "GET" and not service.is_user_owner(request.user):
            return False

        return True
