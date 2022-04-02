import django_filters

from rest_framework.response import Response
from rest_framework import status, permissions, viewsets, generics

from content_app.models import Post, Comment
from .filters import UserFilter
from .models import User, FriendRequest
from .permissions import FriendRequestPermission
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
    filterset_class = UserFilter

    def get_object(self):
        obj = UserService.get_user(self.kwargs.get('user_id'), self.kwargs.get('username'))
        return obj


class UserFriendListView(generics.ListAPIView):
    """View for getting all user friends."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        service = UserService(user_id)
        queryset = service.get_user_friends()
        return queryset


class UserPostListView(generics.ListAPIView):
    """View for getting all user posts."""
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        service = UserService(user_id)
        queryset = service.get_user_posts()
        return queryset


class UserCommentListView(generics.ListAPIView):
    """View for getting all user comments."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        service = UserService(user_id)
        queryset = service.get_user_comments()
        return queryset


class FriendRequestModelViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = (FriendRequestPermission, )

    def get_service(self) -> FriendRequestService:
        service = FriendRequestService(self.request.user)
        return service

    def get_queryset(self):
        service = self.get_service()
        queryset = service.get_current_friend_requests()
        return queryset

    def get_object(self):
        obj = UserService.get_user(user_id=self.kwargs.get('to_user'))
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, *args, **kwargs):
        service = self.get_service()
        user = self.get_object()
        friend_request = service.get_friend_request(request.user, user)
        serializer = self.get_serializer(friend_request)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = self.get_object()
        friend_request = FriendRequest.objects.create(from_user=request.user, to_user=user)
        serializer = self.get_serializer(friend_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        service = self.get_service()
        user = self.get_object()
        friend_request = service.accept_friend_request(user, True)
        serializer = self.get_serializer(friend_request)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        service = self.get_service()
        user = self.get_object()
        service.delete_friend_request(user)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
