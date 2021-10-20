from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('<str:chat_name>/', views.room, name='chat'),
]