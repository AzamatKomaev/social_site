from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views


urlpatterns = [
    path("accept_password/<str:token>", views.accept_password, name="accept_password"),
    path("register", views.register, name="registration"),
    path("not_perms", views.check_perms, name="not_perms"),
    path("exit_auth_user", views.exit_and_login, name="exit_and_login"),
    path("login/password_is_sent", views.password_is_send_success, name='password_is_sent'),
    path("error404", views.return_error404, name='error404'),
    path("register/done", views.register_done, name="register_done"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
