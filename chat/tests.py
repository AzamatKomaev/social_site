import pickle
import os

from django.test import TestCase
from django.test.utils import override_settings
from soc.models import User, Group
from django.core.mail import send_mail
from django.core import mail

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from soc_auth.services import CreationUser
from social.settings import EMAIL_HOST_USER


connection = mail.get_connection()
connection.open()


class ChatTest(TestCase):
    email_for_mailings: str
    SCOPES: list
    dir_path: str

    user1: User
    user2: User

    def setUp(self):
        self.email_for_mailings = os.getenv("EMAIL")
        self.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
        self.dir_path = str(os.path.dirname(os.path.realpath(__file__)))

        Group.objects.create(name="Администратор")
        Group.objects.create(name="Пользователь")
        self.set_users()

    def authenticate_gmail_API(self):
        creds = None

        if os.path.exists(f"{self.dir_path}/google_api/token.pickle"):  # using if else statement
            with open(f"{self.dir_path}/google_api/token.pickle", "rb") as token:
                creds = pickle.load(token)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(f"{self.dir_path}/google_api/data.json", self.SCOPES)  # downloaded credential name
                creds = flow.run_local_server(port=0)  # running credentials

            with open(f"{self.dir_path}/google_api/token.pickle", "wb") as token:
                pickle.dump(creds, token)
        return build('Gmail', 'v1', credentials=creds)

    def set_users(self) -> None:
        """
        Создаем двух пользователей при помощи CreationUser, который позволяет сразу создать пользователя, отправить
        ему сообщение на почту для подтверждения и соответсвенно подтвердить свой аккаунт.
        """

        creation_user1 = CreationUser(data={
                                            "username": "test_user_1",
                                            "email": "azamatkomaev15@gmail.com",
                                            "password1": "test_password_1"
        })

        creation_user2 = CreationUser(data={
                                            "username": "test_user_2",
                                            "email": "test.mail.for.sign.up@gmail.com",
                                            "password1": "test_password_2"
        })

        override_settings(EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend')(creation_user1.send_message_with_code)()
        override_settings(EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend')(creation_user2.send_message_with_code)()

        self.user1 = creation_user1.user
        self.user2 = creation_user2.user

    def test_email_on_watching_messages(self):
        """Тестируем работоспособность google api"""
        service = self.authenticate_gmail_API()
        results = service.users().messages().list(userId='me').execute()
        messages_id = results.get('messages')
        #messages = [service.users().messages().get(userId='me', id=message['id'], format="full").execute() for message in messages_id]

        self.assertEqual(len(messages_id) > 0, True)


