from django.contrib.auth.models import User

from .models import Post
from .forms import CommentForm




def get_post_and_comments(id: int) -> dict:
    post = Post.objects.get(id=id)
    comments = post.comment_set.all().order_by('-pk') if post.comment_set.all() else None
    return {
        'post': post,
        'comments': comments
    }
