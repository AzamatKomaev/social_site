from django.urls import path

from . import views


urlpatterns = [
    path('', views.show_all_chats, name='all_chats'),
    path('<str:chat_name>/', views.room, name='chat'),
    path('my_chat/create', views.create_chat, name='create_chat'),
    path('personal/<str:username>/', views.personal_chat, name='personal_chat'),
]