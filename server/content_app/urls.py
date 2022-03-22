from django.urls import path

from . import views


urlpatterns = [
    path('categories/', views.CategoryListAPIView.as_view(), name="categories.list"),
    path('categories/<int:category_id>/posts/', views.PostModelViewSet.as_view({"get": "list", "post": "create"}),
         name='posts.list'),
    path('posts/<int:post_id>/', views.PostViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
         name='posts.detail'),

    path('posts/<int:post_id>/comments/', views.CommentViewSet.as_view({"get": "list", "post": "create"}),
         name='comments.list'),
    path('comments/<int:comment_id>/', views.CommentViewSet.as_view({"get": "retrieve"}), name='comments.detail'),
]
