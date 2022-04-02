from django_filters.views import FilterView
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from . import views
from .models import User

urlpatterns = [
    path('friend_requests/', views.FriendRequestModelViewSet.as_view({"get": "list"}), name='friend_request.list'),
    path('friend_requests/<to_user>/', views.FriendRequestModelViewSet.as_view(
        {"get": "retrieve", "post": "create",
         "delete": "destroy", "patch": "update"}
    ), name="friend_request.view_set"),

    path('users/', views.UserModelView.as_view({"get": "list"}), name='user.find'),
    path('users/<int:user_id>/friends/', views.UserFriendListView.as_view(), name='friend.list'),
    path('users/<int:user_id>/posts/', views.UserPostListView.as_view()),
    path('users/<int:user_id>/comments/', views.UserCommentListView.as_view()),

    path('auth/login/', TokenObtainPairView.as_view(), name='auth.login'),
    path('auth/register/', views.AuthViewSet.as_view({"post": "create"}), name="auth.register"),
    path('auth/current/', views.AuthViewSet.as_view({"get": "retrieve"}), name='current-user-data'),
    path('auth/accept/<str:token>/', views.AuthViewSet.as_view({"patch": "partial_update"}), name="auth.accept"),
]
