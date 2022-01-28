from django.urls import path

from . import views


urlpatterns = [
    path('personal_chats/', views.PersonalChatViewSet.as_view({"get": "list"})),
    path('personal_chats/<str:to_user_username>/', views.PersonalChatViewSet.as_view({
        "get": "retrieve", "post": "create"
    })),
    path('personal_chats/<str:to_user_username>/messages/', views.PersonalMessageViewSet.as_view({
        "get": "list", "post": "create"
    })),
]
