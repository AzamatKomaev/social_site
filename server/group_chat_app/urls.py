from django.urls import path

from . import views


urlpatterns = [
    # path('user/find/<int:user_id>/chat_request/', views.GroupChatRequestViewSet.as_view({
    #     "get": "list_user_chat_requests"
    # })),

    path('group_chat_requests/<int:user_id>/', views.GroupChatRequestViewSet.as_view({
        "get": "list_user_chat_requests"
    })),

    path('group_chats/', views.GroupChatViewSet.as_view({"get": "list", "post": "create"})),
    path('group_chats/<int:chat_id>/', views.GroupChatViewSet.as_view({
        "get": "retrieve", "delete": "destroy"
    })),
    path('group_chats/<int:chat_id>/messages/', views.GroupMessageViewSet.as_view({
        "get": "list", "post": "create"
    })),
    path('group_chats/<int:chat_id>/members/', views.GroupChatRoleViewSet.as_view({"get": "list"})),
    path('group_chats/<int:chat_id>/requests/', views.GroupChatRequestViewSet.as_view({
        "get": "list_requests",
        "patch": "update"
    })),
    path('group_chats/<int:chat_id>/requests/<int:user_id>/', views.GroupChatRequestViewSet.as_view({
        "get": "detail_request",
        "post": "create",
        "delete": "destroy"
    })),
]




