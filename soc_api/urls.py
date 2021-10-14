from django.urls import path
from soc_api import views

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>', views.PostDetail.as_view()),

    path('users/', views.UserList.as_view()),
    path('users/<str:username>', views.UserDetail.as_view()),
]
