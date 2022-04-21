from typing import Optional, Union

from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator, EmptyPage
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404

from rest_framework.request import Request

from content_app.models import Post, Category, Comment
from user_app.models import User
from .serializers import PostSerializer, CommentSerializer


class PostService:
    post: Post

    def __init__(self, post: Post):
        self.post = post

    def is_user_owner(self, user: User) -> bool:
        """Get bool is user owner of the post."""
        return self.post.user == user


class CommentService:
    comment: Comment

    def __init__(self, comment: Comment):
        self.comment = comment

    def is_user_creator(self, user: User):
        return self.comment.user == user

    def can_user_delete_comment(self, user: User):
        return self.is_user_creator(user) or self.comment.post.user == user
