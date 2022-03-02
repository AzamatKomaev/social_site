from django.urls import path

from . import views


urlpatterns = [
    path('categories/', views.CategoryListAPIView.as_view(), name="category.list"),
    path('categories/<int:category_id>/posts/', views.PostViewSet.as_view({"get": "list", "post": "create"}), name='post.list'),
    path('posts/<int:post_id>/', views.PostViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name='post.detail'),

    path('posts/<int:post_id>/comments/', views.CommentViewSet.as_view({"get": "list", "post": "create"}), name='comment.list'),
    path('comments/<int:comment_id>/', views.CommentViewSet.as_view({"get": "retrieve"}), name='comment.detail'),
]
