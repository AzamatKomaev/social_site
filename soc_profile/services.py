from soc.models import User

from soc.models import Post


def get_data_about_user(username: str) -> dict:
    """Получаем данные о пользователе для их отображения в личном профиле."""
    user = User.objects.get(username=username)
    user_posts = Post.objects.filter(user_id=user.id).order_by("-created_at")
    return {
        'user': user,
        'user_posts': user_posts
    }
