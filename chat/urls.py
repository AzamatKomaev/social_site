from django.urls import path

from . import views


urlpatterns = [
    path('', views.show_all_chats, name='all_chats'),
    path('<str:chat_name>/', views.room, name='chat'),
]