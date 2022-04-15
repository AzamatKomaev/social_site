from django.core.mail import send_mail
from django.utils import timezone

from server.celery import app
from .models import AcceptAuthToken
try:
    from server.settings import EMAIL_HOST_USER
except ImportError:
    EMAIL_HOST_USER = ""


@app.task
def send_mail_with_accepting_token(content: str, receivers: list[str]):
    send_mail(
        "Регистрация в InTheGame",
        content,
        EMAIL_HOST_USER,
        receivers
    )


@app.task
def delete_expired_tokens():
    for token in AcceptAuthToken.objects.all():
        if token.expired_at > timezone.now():
            token.delete()

