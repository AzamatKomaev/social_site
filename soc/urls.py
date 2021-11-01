from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("", views.show_all_categories, name='main'),
    path("<str:category>", views.show_all_posts, name='all_posts'),
    path("<str:category>/<int:id>", views.show_post, name="post"),
    path("<str:category>/create_post", views.create_post, name="create_post"),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
