from typing import Optional

from rest_framework.response import Response
from rest_framework import status, permissions, viewsets, generics

from content_app.models import Post, Comment
from .models import User, FriendRequest
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
        serializer = UserService.create(request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, token: str):
        """The action to accept registration user by his token."""
        CreationUser.accept_password_to_reg(token=token)
        return Response({"message": "Accepted successfully."}, status=status.HTTP_200_OK)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'retrieve':
            permission_classes = (permissions.IsAuthenticated,)
        else:
            permission_classes = (permissions.AllowAny,)
        return [permission() for permission in permission_classes]


class UserModelView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def get_object(self):
        obj = UserService.get_user(self.kwargs.get('user_id'), self.kwargs.get('username'))
        return obj


class UserFriendListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        serivce = UserService(user_id)
        queryset = serivce.get_user_friends()
        return queryset


class UserPostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        service = UserService(user_id)
        queryset = service.get_user_posts()
        return queryset


class UserCommentListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        service = UserService(user_id)
        queryset = service.get_user_comments()
        return queryset


class FriendRequestViewSet(viewsets.ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @staticmethod
    def check_possible_errors(
                             to_user_object: Optional[User],
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

        friend_request = friend_request_service.get_friend_request(request.user, to_user_object)
        friend_request = FriendRequest.objects.first()
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
