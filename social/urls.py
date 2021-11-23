from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from chat import views


urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('soc.urls')),

    #path('users/', include('soc_profile.urls')),
    #path('auth/', include('soc_auth.urls')),

    path('api/v1/', include('soc.api.urls')),
    path('jwt/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('auth_api/', include('djoser.urls')),
    #path('auth_api/token', obtain_auth_token, name="token"),

    #path('chats/', include('chat.urls')),

    #path('accounts/', include('django.contrib.auth.urls')),
]
