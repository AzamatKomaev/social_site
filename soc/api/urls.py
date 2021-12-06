from django.urls import path
from soc.api import views


urlpatterns = [
    path('category/', views.CategoryListAPIView.as_view(), name="categories"),
    path('category/<int:category_id>/', views.PostListAPIVIew.as_view(), name="posts"),
    path('category/<int:category_id>/<int:post_id>/', views.PostDetailAPIView.as_view(), name="post"),
    path('category/<int:category_id>/<int:post_id>/comment/', views.CommentListAPIView.as_view(), name="comments"),
    path('category/<int:category_id>/<int:post_id>/comment/<int:comment_id>/', views.CommentDetailAPIView.as_view(), name="comment"),

    path('user/find/<int:user_id>/', views.UserDetailAPIView.as_view()),
    path('user/find/<str:username>/', views.UserDetailAPIView.as_view()),
    path('user/register/', views.RegistrationUserAPIView.as_view()),
    path('user/is_auth/', views.UserJwtAPIView.as_view()),
    path('user/accept/<str:token>/', views.AcceptUserAPIView.as_view()),
    path('user/posts/<int:user_id>/', views.UserDetailPostAPIView.as_view()),

    path('chats/', views.ChatListAPIView.as_view())
]
