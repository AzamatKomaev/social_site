from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("", views.show_all_post, name='main'),
    path("<int:id>", views.show_post, name="post"),
    path("create_post", views.create_post, name="create_post"),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
