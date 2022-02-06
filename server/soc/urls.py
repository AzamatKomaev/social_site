from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("categories/", views.index, name="home"),
    path("categories/create/", views.index, name="create_post"),
    path("categories/c_id/<int:category_id>/", views.index, name="all_posts"),
    path("categories/c_id/<int:category_id>/<int:post_id>/", views.index, name="detail_post"),

    path("notifications/", views.index),

    path("auth/login/", views.index, name="login"),
    path("auth/sign_up/", views.index, name="signup"),
    path("auth/accept/<str:token>/", views.index, name="accept"),

    path("users/<str:username>/", views.index, name="user-profile"),
    path("users/<str:username>/friends/", views.index),

    path("chats/", views.index, name="chats"),
    path("chats/group/", views.index),
    path("chats/personal/", views.index),

    path("chats/group/<int:chat_id>/", views.index, name="chat-messages"),
    path("chats/group/<int:chat_id>/settings/", views.index, name="chat-settings"),
    path("chats/personal/<str:username>/", views.index),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
