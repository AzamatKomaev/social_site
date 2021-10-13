from django.urls import path
from soc_api import views

urlpatterns = [
    path('posts/', views.post_list),
    path('posts/<int:pk>', views.post_detail),
    path('users/', views.user_list),
    path('users/<str:username>', views.user_detail)
]
