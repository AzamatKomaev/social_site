from jwt import decode as jwt_decode
from typing import Union
from urllib.parse import parse_qs

from channels.db import database_sync_to_async, close_old_connections

from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework import exceptions

from user_app.models import User


@database_sync_to_async
def get_user(token: str) -> Union[User or AnonymousUser]:
    if not token or token == b'null':
        return AnonymousUser()

    try:
        UntypedToken(token)
    except (InvalidToken, TokenError) as e:
        return AnonymousUser()

    decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    try:
        return User.objects.get(id=decoded_data['user_id'])
    except ObjectDoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        close_old_connections()

        unparsed_token = scope['query_string']

        list_with_token_or_none = parse_qs(unparsed_token).get(b'token', None)
        parsed_token = list_with_token_or_none[0] if list_with_token_or_none else None
        scope['user'] = await get_user(parsed_token)

        if scope['user'] == AnonymousUser():
            raise exceptions.AuthenticationFailed("AnonymousUser can't connect to chat ws.")

        return await self.inner(scope, receive, send)


def JWTAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(inner)
