from django.urls import path

from soc.api.views import (
    content_views,
    user_views,
    chat_views
)


urlpatterns = [
    path('category/', content_views.CategoryListAPIView.as_view(), name="categories"),
    path('category/<int:category_id>/', content_views.PostViewSet.as_view({"get": "list", "post": "create"})),
    path('post/<int:post_id>/', content_views.PostViewSet.as_view({"get": "retrieve"})),

    path('post/<int:post_id>/comment/', content_views.CommentViewSet.as_view({"get": "list", "post": "create"})),
    path('comment/<int:comment_id>/', content_views.CommentViewSet.as_view({"get": "retrieve"})),

    path('user/find/<int:user_id>/', user_views.UserViewSet.as_view({"get": "retrieve"})),
    path('user/find/<str:username>/', user_views.UserViewSet.as_view({"get": "retrieve"})),
    path('user/find/<int:user_id>/friends/', user_views.UserFriendsAPIView.as_view()),
    path('user/find/<int:to_user>/friend_request/', user_views.FriendRequestAPIView.as_view()),

    path('user/register/', user_views.UserViewSet.as_view({"post": "create_registration_user"})),
    path('user/is_auth/', user_views.UserViewSet.as_view({"get": "retrieve_current_user"})),
    path('user/accept/<str:token>/', user_views.UserViewSet.as_view({"patch": "accept_registration_user"})),
    path('user/posts/<int:user_id>/', user_views.UserViewSet.as_view({"get": "list_of_user_posts"})),
    path('user/comments/<int:user_id>/', user_views.UserViewSet.as_view({"get": "list_of_user_comments"})),

    path('chats/', chat_views.GroupChatViewSet.as_view({"get": "list"})),
    path('chats/<int:chat_id>/', chat_views.GroupChatViewSet.as_view({"get": "retrieve", "post": "create_message"})),
    path('chats/<int:chat_id>/messages/', chat_views.GroupChatViewSet.as_view({"get": "list_message"})),
    path('chats/<int:chat_id>/members/', chat_views.GroupChatViewSet.as_view({"get": "list_members"})),
    path('chats/<int:chat_id>/request/', chat_views.ChatRequestAPIView.as_view()),

    path('personal_chats/', chat_views.PersonalChatViewSet.as_view({"get": "list"})),
    path('personal_chats/<str:to_user_username>/', chat_views.PersonalChatViewSet.as_view({"get": "retrieve"})),
    path('personal_chats/<str:to_user_username>/messages/', chat_views.PersonalChatViewSet.as_view(
                                                                    {"get": "list_message", "post": "create_message"}
    )),
]
