from django.shortcuts import redirect


class RegisteredUserMiddleware:
    """Middleware для проверки юзера на его регистрацию."""
    app_names = {
        'main': "/main/",
        'create_post': "/auth/register/",
        'exit_and_login': "/auth/exit_auth_user/",
        'login': "/accounts/login/",
        'logout': "/accounts/logout/",
        'registration': "/auth/register/"
    }


    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        print(request.path)
        if (self.app_names['main'] in request.path and request.path != self.app_names['create_post']) and (request.method == "POST") and (not request.user.is_authenticated):
            """Проверка пользователя на регистрацию при созданий поста/комментария."""
            return redirect('login')

        if request.path == self.app_names['create_post'] and not request.user.is_authenticated:
            return redirect("error404")

        if (request.path == self.app_names['exit_and_login'] or request.path == self.app_names['logout']) and (not request.user.is_authenticated):
            """
            Проверка пользователя на регистрацию при выходе.
            Анонимный пользователь не зарегистрирован и поэтому он не может выйти.
            """
            return redirect('error404')

        if (request.path == self.app_names['login'] or request.path == self.app_names['registration']) and request.user.is_authenticated:
            """
            Проверка пользователя на регистрацию при попытке открыть форму с регистрацией или входом.
            Зарегистрированный пользователь не может зайти или зарегистрироваться, не выйдя из текущего аккаунта.
            """
            return redirect('error404')

        response = self._get_response(request)
        return response
