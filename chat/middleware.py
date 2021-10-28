from django.shortcuts import redirect


class ChatMiddleware:
    """Middleware для чата."""
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
        response = self._get_response(request)
        return response
