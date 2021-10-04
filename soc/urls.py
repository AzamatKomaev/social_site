from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("", views.show_all_post, name='main'),
    path("<int:id>", views.show_post, name="post"),
    path("show_all_users", views.show_all_users, name="show_all_users"),
    path("user/<str:username>", views.show_profile, name="profile"),
    path("create_post", views.create_post, name="create_post"),
    path("accept_password/<str:token>", views.accept_password, name="accept_password"),
    path("permissions/not_perms", views.check_perms, name="not_perms"),
    path("exit_auth_user", views.exit_and_login, name="exit_and_login"),
    path("accounts/login/passowors_is_sent", views.password_is_send_success, name='password_is_sent'),
    path("error404", views.return_error404, name='error404'),
    path("register", views.register, name="registration"),
    path("register/done", views.register_done, name="register_done"),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)