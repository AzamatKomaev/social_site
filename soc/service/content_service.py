import logging

from soc.models import User

from ..models import Post, Category


logger = logging.getLogger(__name__)


def get_form_and_create_comment(request, post):
    """Функция для получения формы для комментария и его создания"""
    form = CommentForm(request.POST)
    if form.is_valid():
        user_id = request.user.id
        comment_text = form.cleaned_data["text"]
        comment = post.comment_set.create(text=comment_text, user_id=user_id)
        if comment:
            logger.info(f"Комментарий  {comment.id}|{comment_text} был оставлен под постом {post.id}|{post.title} пользователем {request.user.id}|{request.user.username}")
        else:
            logger.error(f"Произошла ошибка с добавлением комментария пользователем {request.user.id}|{request.user.username} комментария {comment_text}")

    return form


def get_post_data(request, post_data: dict) -> dict:
    """Функция для получения данных из формы"""
    title = post_data["title"]
    post = post_data["text"]
    image = post_data["image"]
    user_id = request.user.id
    return {"title": title, "text": post, "image": image, "user_id": user_id}


def insert_into_post_table(title, text, image, user_id, category) -> None:
    """Функция для создания поста"""
    user = User.objects.get(id=user_id)
    category = Category.objects.get(name=category)

    added_post = Post.objects.create(title=title, text=text, user_id=user_id, category_id=category.id)
    added_post.attachment_set.create(photo=image) if image else None
    if added_post:
        logger.info(f"Пост  {added_post.id}|{added_post.title} был добавлен пользователем {user_id}|{user.username}")
    else:
        logger.error(f"Произошла ошибка с добавлением поста {added_post.id}|{added_post.title} пользователем {user.id}|{user.username}")


def get_post_and_comments(id: int) -> dict:
    post = Post.objects.get(id=id)
    comments = post.comment_set.all() if post.comment_set.all() else None
    return {
        'post': post,
        'comments': comments
    }
