from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("categories/", views.index, name="home"),
    path("categories/create/", views.index, name="create_post"),
    path("categories/c_id/<int:category_id>/", views.index, name="all_posts"),
    path("categories/c_id/<int:category_id>/<int:post_id>/", views.index, name="detail_post"),

    path("auth/login/", views.index, name="login"),
    path("auth/sign_up/", views.index, name="signup"),
    #path("main", views.show_all_categories, name='main'),
    #path("<str:category>", views.show_all_posts, name='all_posts'),
    #path("test/<int:category_id>/<int:id>/", views.show_post, name="post"),
    #path("<str:category>/create_post", views.create_post, name="create_post"),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
