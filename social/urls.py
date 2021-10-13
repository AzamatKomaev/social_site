from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from soc_api import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('main/', include('soc.urls')),
    path('api/v1/', include('soc_api.urls')),

    path('accounts/', include('django.contrib.auth.urls')),
]
