from celery import shared_task
from django.core.mail import send_mail

from server.celery import app
from .models import AcceptAuthToken
try:
    from server.settings import EMAIL_HOST_USER
except ImportError:
    EMAIL_HOST_USER = ""


@shared_task
def send_mail_with_accepting_token(content: str, receivers: list[str]):
    send_mail(
        "Регистрация в InTheGame",
        content,
        EMAIL_HOST_USER,
        receivers
    )


@shared_task
def delete_token():
    for token in AcceptAuthToken.objects.all():
        token.delete()

    return "done"
