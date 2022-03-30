from django.urls import path

from . import views


urlpatterns = [
    path('group_chat_requests/<int:user_id>/', views.GroupChatRequestListAPIView.as_view(),
         name='group_chats_requests.to_user.list'),

    path('group_chats/', views.GroupChatModelViewSet.as_view({"get": "list", "post": "create"}), name='group_chats.list'),
    path('group_chats/<int:pk>/', views.GroupChatModelViewSet.as_view({
        "get": "retrieve", "delete": "destroy"
    }), name='group_chats.detail'),

    path('group_chats/<int:chat_id>/messages/', views.GroupMessageModelViewSet.as_view({
        "get": "list", "post": "create"
    }), name='group_chats_messages.list'),
    path('group_chats/<int:chat_id>/members/', views.GroupChatRoleModelViewSet.as_view({"get": "list"}),
         name='group_chat_members.list'),
    path('group_chats/<int:chat_id>/members/<int:user_id>/', views.GroupChatRoleModelViewSet.as_view({
        "get": "retrieve", "patch": "update"
    }), name='group_chat_members.detail'),
    path('group_chats/<int:chat_id>/requests/', views.GroupChatRequestModelViewSet.as_view({
        "get": "list",
        "patch": "update"
    }), name='group_chats_requests.list'),
    path('group_chats/<int:chat_id>/requests/<int:user_id>/', views.GroupChatRequestModelViewSet.as_view({
        "get": "retrieve",
        "post": "create",
        "delete": "destroy"
    }), name='group_chats_requests.to_user.detail'),
]




