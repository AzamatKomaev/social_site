from django.urls import path

from . import views


urlpatterns = [
    path('category/', views.CategoryListAPIView.as_view(), name="category.list"),
    path('category/<int:category_id>/', views.PostViewSet.as_view({"get": "list", "post": "create"}), name='post.list'),
    path('post/<int:post_id>/', views.PostViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name='post.detail'),

    path('post/<int:post_id>/comment/', views.CommentViewSet.as_view({"get": "list", "post": "create"}), name='comment.list'),
    path('comment/<int:comment_id>/', views.CommentViewSet.as_view({"get": "retrieve"}), name='comment.detail'),
]
