from soc.models import User


def return_user_group(user) -> str:
    """Функция для определения в какой группе находиться пользователь."""
    if user.is_authenticated:
        user_group = user.groups.get()
        return str(user_group)
    else:
        return "anon_user"

