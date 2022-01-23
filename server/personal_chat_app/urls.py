from django.urls import path

from . import views


urlpatterns = [
    path('personal_chats/', views.PersonalChatViewSet.as_view({"get": "list"})),
    path('personal_chats/<str:to_user_username>/', views.PersonalChatViewSet.as_view({"get": "retrieve"})),
    path('personal_chats/<str:to_user_username>/messages/', views.PersonalChatViewSet.as_view(
                                                                    {"get": "list_message", "post": "create_message"}
    )),
]
