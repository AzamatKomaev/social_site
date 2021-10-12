from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from soc_api import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'posts', views.PostViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('main/', include('soc.urls')),
    path('api/v1/', include(router.urls)),

    path('accounts/', include('django.contrib.auth.urls')),
]
