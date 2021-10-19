from django.contrib import admin
from django.urls import path, include

from chat import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('main/', include('soc.urls')),
    path('api/v1/', include('soc_api.urls')),

    path('chat/', include('chat.urls')),

    path('accounts/', include('django.contrib.auth.urls')),
]
