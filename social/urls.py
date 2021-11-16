from django.contrib import admin
from django.urls import path, include

from chat import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('main/', include('soc.urls')),
    path('users/', include('soc_profile.urls')),
    path('auth/', include('soc_auth.urls')),

    path('api/v1/', include('soc.api.urls')),

    path('chats/', include('chat.urls')),

    path('accounts/', include('django.contrib.auth.urls')),
]
