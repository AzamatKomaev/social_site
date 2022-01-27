from django.urls import path

from . import views


urlpatterns = [
    path('user/find/<int:user_id>/chat_request/', views.GroupChatRequestViewSet.as_view({
        "get": "list_user_chat_requests"
    })),

    path('chats/', views.GroupChatViewSet.as_view({"get": "list", "post": "create"})),
    path('chats/<int:chat_id>/', views.GroupChatViewSet.as_view({"get": "retrieve"})),
    path('chats/<int:chat_id>/messages/', views.GroupChatMessageViewSet.as_view({
        "get": "list", "post": "create"
    })),
    path('chats/<int:chat_id>/members/', views.GroupChatRoleViewSet.as_view({"get": "list"})),
    path('chats/<int:chat_id>/request/', views.GroupChatRequestViewSet.as_view({
        "get": "list_requests",
        "patch": "update"
    })),
    path('chats/<int:chat_id>/request/<int:user_id>/', views.GroupChatRequestViewSet.as_view({
        "get": "detail_request",
        "post": "create",
        "delete": "destroy"
    })),

]
