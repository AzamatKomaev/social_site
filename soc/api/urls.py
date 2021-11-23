from django.urls import path
from soc.api import views


urlpatterns = [
    path('category/', views.CategoryListAPIView.as_view(), name="categories"),
    path('category/<int:category_id>/', views.PostListAPIVIew.as_view(), name="posts"),
    path('category/<int:category_id>/<int:post_id>/', views.PostDetailAPIView.as_view(), name="post"),
    path('category/<int:category_id>/<int:post_id>/comment/', views.CommentListAPIView.as_view(), name="comments"),
    path('category/<int:category_id>/<int:post_id>/comment/<int:comment_id>/', views.CommentDetailAPIView.as_view(), name="comment"),

    path('user/<int:user_id>/', views.UserDetailAPIView.as_view()),
    path('user/<str:username>/', views.UserDetailAPIView.as_view()),
]
