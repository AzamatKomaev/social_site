from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('soc.urls')),

    path('api/v1/', include('content_app.urls')),
    path('api/v1/', include('user_app.urls')),
    path('api/v1/', include('group_chat_app.urls')),
    path('api/v1/', include('personal_chat_app.urls')),

    path('jwt/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('jwt/refresh_token/', TokenRefreshView.as_view(), name='token_refresh'),
]
