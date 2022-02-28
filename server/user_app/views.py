from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets

from django.core.exceptions import ObjectDoesNotExist

from .models import User
from .services import UserService, CreationUser, FriendRequestService
from .serializers import (
    UserSerializer,
    FriendRequestSerializer
)
from content_app.serializers import (
    PostSerializer,
    CommentSerializer
)


class AuthViewSet(viewsets.ViewSet):
    permission_classes = (permissions.AllowAny,)

    def retrieve(self, request):
        """The action to get data about current user."""
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """The action to create user with is_active=False."""
        serializer_data = UserService.create(request)
        if not serializer_data['is_valid']:
            return Response(serializer_data['serializer'].errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_data['serializer'].data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, token: str):
        """The action to accept registration user by his token."""
        CreationUser.accept_password_to_reg(token=token)
        return Response({"message": "Accepted successfully."}, status=status.HTTP_200_OK)



class UserViewSet(viewsets.ViewSet):
    permissions_classes = [permissions.IsAuthenticatedOrReadOnly]

    def retrieve(self, request, username: str = None, user_id: int = None):
        """The action to get data about user by his username or id."""
        user = UserService.get_user(user_id=user_id, username=username)
        if not user:
            return Response({"error": "User not found with given data."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def list_user_posts(self, request, user_id: int):
        """The action to get all user posts by his id."""
        user_service = UserService(user_id)
        posts = user_service.get_user_posts()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def list_user_comments(self, request, user_id: int):
        """The action to get all user comments by his id."""
        user_service = UserService(user_id)
        comments = user_service.get_user_comments()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]


class UserFriendsAPIView(APIView):
    """API View to get all user friends."""
    def get(self, request, user_id: int) -> Response:
        user_service = UserService(user_id)
        friends = user_service.get_user_friends()
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)


class FriendRequestViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @staticmethod
    def check_possible_errors(
                             to_user_object: User,
                             friend_request_service: FriendRequestService
                             ) -> dict:
        """
        Static method for get, delete and patch methods for checking possible errors for all these methods.
        """
        if not to_user_object:
            return {
                "message": "User with this id doesnt exists.",
                "status_code": status.HTTP_404_NOT_FOUND
            }

        if not friend_request_service.is_friend_request_exists(to_user_object.id):
            return {
                "message": "Friend Request with this data doesnt exists.",
                "status_code": status.HTTP_404_NOT_FOUND
            }

    def list(self, request):
        friend_request_service = FriendRequestService(request.user)
        chat_requests = friend_request_service.get_current_friend_requests()
        serializer = FriendRequestSerializer(chat_requests, many=True)
        return Response(serializer.data)

    def retrieve(self, request, to_user: int):
        friend_request_service = FriendRequestService(request.user)
        to_user_object = UserService.get_user(user_id=to_user)

        possible_errors = self.check_possible_errors(
            to_user_object=to_user_object,
            friend_request_service=friend_request_service
        )

        if possible_errors:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        friend_request = FriendRequestService.get_friend_request(request.user, to_user_object)
        if not friend_request:
            return Response({"message": "Bad request."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FriendRequestSerializer(friend_request)
        return Response(serializer.data)

    def create(self, request, to_user: int):
        friend_request_service = FriendRequestService(request.user)
        data = friend_request_service.create_friend_request(to_user)

        if data["error"]:
            return Response({"message": data["error"]}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FriendRequestSerializer(data["instance"])
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, to_user: int):
        friend_request_service = FriendRequestService(request.user)
        to_user_object = UserService.get_user(user_id=to_user)

        possible_errors = self.check_possible_errors(
            to_user_object=to_user_object,
            friend_request_service=friend_request_service
        )

        if possible_errors:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        if not friend_request_service.delete_friend_request(to_user_object):
            return Response({"message": "Bad request."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Request was deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    def update(self, request, to_user: int):
        if "is_accepted" not in request.query_params:
            return Response({
                "message": "Bad request: there is not is_accepted value in query params"
            }, status=status.HTTP_400_BAD_REQUEST)

        is_accepted = bool(int(request.query_params['is_accepted']))
        friend_request_service = FriendRequestService(request.user)
        to_user_object = UserService.get_user(user_id=to_user)
        possible_errors = self.check_possible_errors(
            to_user_object=to_user_object,
            friend_request_service=friend_request_service
        )

        if possible_errors:
            return Response({"message": possible_errors['message']}, status=possible_errors['status_code'])

        friend_request = friend_request_service.accept_friend_request(to_user_object, is_accepted)

        if not friend_request:
            return Response({"message": "Bad request."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FriendRequestSerializer(friend_request)
        return Response(serializer.data, status=status.HTTP_200_OK)
