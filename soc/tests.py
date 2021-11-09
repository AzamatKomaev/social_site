import os

from django.test import TestCase
from django.contrib.auth.models import User


"""Install pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib"""


class UserTest(TestCase):
    """Данные для регистраций тестового пользователя."""
    test_user1: User
    test_user2: User

    mail_from_send_messages: str = os.getenv("EMAIL")

    def setUp(self):
        ...
