from django.contrib.auth.models import User

from ..models import Post
from ..forms import CommentForm


def get_form_and_create_comment(request, post):
    """Функция для получения формы для комментария и его создания"""
    form = CommentForm(request.POST)
    if form.is_valid():
        user_id = request.user.id
        comment_text = form.cleaned_data["text"]
        post.comment_set.create(text=comment_text, user_id=user_id)

    return form


def get_post_data(request, post_data: dict) -> dict:
    """Функция для получения данных из формы"""
    title = post_data["title"]
    post = post_data["post"]
    image = post_data["image"]
    user_id = request.user.id
    return {"title": title, "post": post, "image": image, "user_id": user_id}


def insert_into_post_table(title, post, image, user_id) -> None:
    """Функция для создания поста"""
    add_post = Post.objects.create(title=title, text=post, user_id=user_id)
    add_post.attachment_set.create(photo=image) if image else None


def check_user_form_on_errors(form) -> str:
    """Функция для проверки данных из формы на правильность ввода"""
    data_form = form.cleaned_data
    if data_form['password1'] != data_form['password2']:
        return "both_password_error"

    elif len(data_form['password1']) < 8:
        return "password_error"

    elif User.objects.filter(email=data_form['email']).exists():
        return "email_error"

    else:
        return "not errors"


def get_post_and_comments(id: int) -> dict:
    post = Post.objects.get(id=id)
    comments = post.comment_set.all().order_by('-pk') if post.comment_set.all() else None
    return {
        'post': post,
        'comments': comments
    }

