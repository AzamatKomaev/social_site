import pickle
import os

from django.test import TestCase
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request


class ChatTest(TestCase):
    email_for_mailings: str
    SCOPES: list
    dir_path: str

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
        return build('Gmail', 'v1', credentials=creds)  # using Gmail to authenticate

    def setUp(self):
        self.email_for_mailings = os.getenv("EMAIL")
        self.SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
        self.dir_path = str(os.path.dirname(os.path.realpath(__file__)))

    def test_email_on_getting_messages(self):
        service = self.authenticate_gmail_API()
        results = service.users().messages().list(userId='me').execute()
        messages_id = results.get('messages')
        messages = [service.users().messages().get(userId='me', id=message['id'], format="full").execute() for message in messages_id]
        self.assertEqual(len(messages) > 0, True)
