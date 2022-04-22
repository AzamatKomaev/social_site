from django.http import Http404
from rest_framework import permissions, exceptions, status


class FriendRequestAlreadyExists(exceptions.APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = {'error': 'The friend request already exists.'}


class UserIsNotReceiver(exceptions.APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_code = {'error': 'You are not receiver and can\' accept the friend request.'}


class FriendRequestPermission(permissions.IsAuthenticatedOrReadOnly):
    def has_object_permission(self, request, view, obj):
        from .services import FriendRequestService
        service = FriendRequestService(request.user)
        is_existing = service.is_friend_request_existing(obj.id)

        if request.method in ('GET', 'PATCH', 'DELETE') and not is_existing:
            raise Http404({'error': 'Not found'})

        if request.method == 'POST' and is_existing:
            raise FriendRequestAlreadyExists()

        return True
