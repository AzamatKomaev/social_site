import django_filters
from .models import Post, Comment


class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = ['user__id', 'category__id']
        ordering = ['title']


class CommentFilter(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = ['user__id', 'post__id']
