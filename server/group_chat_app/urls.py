from django.urls import path

from . import views


urlpatterns = [
    path('user/find/<int:user_id>/chat_request/', views.GroupChatRequestViewSet.as_view({
        "get": "list_user_chat_requests"
    })),

    path('chats/', views.GroupChatViewSet.as_view({"get": "list"})),
    path('chats/<int:chat_id>/', views.GroupChatViewSet.as_view({"get": "retrieve", "post": "create_message"})),
    path('chats/<int:chat_id>/messages/', views.GroupChatViewSet.as_view({"get": "list_message"})),
    path('chats/<int:chat_id>/members/', views.GroupChatViewSet.as_view({"get": "list_members"})),
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
