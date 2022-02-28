from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views


urlpatterns = [
    path('friend_requests/', views.FriendRequestViewSet.as_view({"get": "list"}), name='friend_request.list'),
    path('friend_requests/<to_user>/', views.FriendRequestViewSet.as_view(
        {"get": "retrieve", "post": "create",
         "delete": "destroy", "patch": "update"}
    ), name="friend_request.view_set"),

    path('users/<int:user_id>/', views.UserViewSet.as_view({"get": "retrieve"}), name='user.find_by_id'),
    path('users/<str:username>/', views.UserViewSet.as_view({"get": "retrieve"}), name='user.find_by_username'),
    path('users/<int:user_id>/friends/', views.UserFriendsAPIView.as_view(), name='friend.list'),
    path('users/<int:user_id>/posts/', views.UserViewSet.as_view({"get": "list_user_posts"})),
    path('users/<int:user_id>/comments/', views.UserViewSet.as_view({"get": "list_user_comments"})),

    path('auth/login/', TokenObtainPairView.as_view(), name='auth.login'),
    path('auth/register/', views.AuthViewSet.as_view({"post": "create"}), name="auth.register"),
    path('auth/current/', views.AuthViewSet.as_view({"get": "retrieve"}), name='current-user-data'),
    path('auth/accept/<str:token>/', views.AuthViewSet.as_view({"patch": "partial_update"}), name="auth.accept"),
]
