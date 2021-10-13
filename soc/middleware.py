from django.shortcuts import redirect


class RegisteredUserMiddleware:
    """Middleware для проверки юзера на его регистрацию."""
    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        if ("/main/" in request.path and request.path != "/main/register") and (request.method == "POST") and (not request.user.is_authenticated):
            """Проверка пользователя на регистрацию при созданий поста/комментария."""
            return redirect('login')

        if request.path == "/main/create_post" and not request.user.is_authenticated:
            return redirect("error404")

        if request.path == "/main/exit_auth_user" and not request.user.is_authenticated:
            """
            Проверка пользователя на регистрацию при выходе.
            Анонимный пользователь не зарегистрирован и поэтому он не может выйти.
            """
            return redirect('error404')

        response = self._get_response(request)
        return response
