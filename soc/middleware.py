from django.shortcuts import redirect


class RegisteredUserMiddleware:
    """Middleware для проверки юзера на его регистрацию."""
    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        print(f"Middleware_reg was worked before request for  {request.path}")
        if ("/main/" in request.path and request.path != "/main/register") and (request.method == "POST") and (not request.user.is_authenticated):
            return redirect('login')

        response = self._get_response(request)
        return response
