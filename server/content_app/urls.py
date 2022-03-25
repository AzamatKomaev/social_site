from django.urls import path

from . import views


urlpatterns = [
    path('categories/', views.CategoryListRetrieveView.as_view({"get": "list"}), name="categories.list"),
    path('categories/<int:pk>/', views.CategoryListRetrieveView.as_view({"get": "retrieve"}), name="categories.detail"),
    path('categories/<int:category_id>/posts/', views.PostModelViewSet.as_view({"get": "list", "post": "create"}),
         name='posts.list'),
    path('posts/<int:pk>/', views.PostModelViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
         name='posts.detail'),

    path('posts/<int:post_id>/comments/', views.CommentModelViewSet.as_view({"get": "list", "post": "create"}),
         name='comments.list'),
    path('comments/<int:pk>/', views.CommentModelViewSet.as_view({"get": "retrieve", "delete": "destroy"}),
         name='comments.detail'),
]
