import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from soc.api.routing import websocket_urlpatterns
from soc.middleware import JWTAuthMiddlewareStack


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "social.settings")


application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": JWTAuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})

