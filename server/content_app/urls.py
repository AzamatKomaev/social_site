from django.urls import path

from . import views


urlpatterns = [
    path('category/', views.CategoryListAPIView.as_view(), name="categories"),
    path('category/<int:category_id>/', views.PostViewSet.as_view({"get": "list", "post": "create"})),
    path('post/<int:post_id>/', views.PostViewSet.as_view({"get": "retrieve"})),

    path('post/<int:post_id>/comment/', views.CommentViewSet.as_view({"get": "list", "post": "create"})),
    path('comment/<int:comment_id>/', views.CommentViewSet.as_view({"get": "retrieve"})),
]
