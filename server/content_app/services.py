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

    def __init__(self, post_id: int):
        self.post = get_object_or_404(Post, id=post_id)

    @staticmethod
    def get_paginated_post_list(category_id: int, request: Request, page_size: int) -> Optional[PostSerializer]:
        posts = Post.objects.filter(category=category_id)
        page_number = request.query_params.get('page_number', 1)
        paginator = Paginator(posts, page_size)

        try:
            serializer = PostSerializer(paginator.page(page_number), many=True)
            return serializer
        except EmptyPage:
            return None

    @staticmethod
    def create(request: Request) -> Optional[dict[str, Union[PostSerializer, bool]]]:
        """Method to create post and return PostSerializer or None."""
        serializer = PostSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return None

            return {'serializer': serializer, 'is_valid': True}

        return {'serializer': serializer, 'is_valid': False}

    def is_user_owner(self, user: User) -> bool:
        """Get bool is user owner of the post."""
        return self.post.user == user

    def delete(self):
        self.post.delete()


class CommentService:
    post_id: int

    def __init__(self, post_id: int):
        self.post_id = post_id

    def get_list(self) -> CommentSerializer:
        comments = Comment.objects.filter(post_id=self.post_id)
        serializer = CommentSerializer(comments, many=True)
        return serializer

    def create(self, request: Request) -> Optional[dict[str, Union[PostSerializer, bool]]]:
        data = {**request.data, **{"post": self.post_id}}
        serializer = CommentSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            try:
                serializer.save()
            except ObjectDoesNotExist:
                return None

            return {'serializer': serializer, 'is_valid': True}

        return {'serializer': serializer, 'is_valid': False}

