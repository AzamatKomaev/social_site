from django.urls import path

from soc.api.views import (
    content_views,
    user_views,
    chat_views
)


urlpatterns = [
    path('category/', content_views.CategoryListAPIView.as_view(), name="categories"),
    path('category/<int:category_id>/', content_views.PostListAPIVIew.as_view(), name="posts"),
    path('category/<int:category_id>/<int:post_id>/', content_views.PostDetailAPIView.as_view(), name="post"),
    path('category/<int:category_id>/<int:post_id>/comment/', content_views.CommentListAPIView.as_view(), name="comments"),
    path('category/<int:category_id>/<int:post_id>/comment/<int:comment_id>/', content_views.CommentDetailAPIView.as_view(), name="comment"),

    path('user/find/<int:user_id>/', user_views.UserDetailAPIView.as_view()),
    path('user/find/<str:username>/', user_views.UserDetailAPIView.as_view()),
    path('user/find/<int:user_id>/friends/', user_views.UserFriendsAPIView.as_view()),
    path('user/find/<int:to_user>/send_friend_request/', user_views.FriendRequestAPIView.as_view()),

    path('user/register/', user_views.RegistrationUserAPIView.as_view()),
    path('user/is_auth/', user_views.UserJwtAPIView.as_view()),
    path('user/accept/<str:token>/', user_views.AcceptUserAPIView.as_view()),
    path('user/posts/<int:user_id>/', user_views.UserDetailPostAPIView.as_view()),
    path('user/comments/<int:user_id>/', user_views.UserDetailCommentAPIView.as_view()),

    path('chats/', chat_views.GroupChatListAPIView.as_view()),
    path('chats/<int:chat_id>/', chat_views.GroupChatDetailAPIView.as_view()),
    path('chats/<int:chat_id>/messages/', chat_views.GroupMessageListAPIView.as_view()),
    path('chats/<int:chat_id>/members/', chat_views.GroupChatMemberListAPIView.as_view()),

    path('personal_chats/', chat_views.PersonalChatListAPIView.as_view()),
    path('personal_chats/<str:to_user_username>/', chat_views.PersonalChatDetailAPIView.as_view()),
    path('personal_chats/<str:to_user_username>/messages/', chat_views.PersonalMessageListAPIView.as_view()),
]

