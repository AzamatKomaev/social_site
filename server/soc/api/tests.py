import random
import requests

from django.test import TestCase

from soc.models import User
from soc.models_dir import group_chat as group_chat_models


class GroupChatTestCase(TestCase):
    """Тест кейс для тестирования логики групповых чатов."""
    chats = None
    users = None

    def generate_name(self) -> str:
        name = ""
        letters = "qwertyuiopasdfghjklzxcvbnm "
        for i in range(30):
            name += random.choice(letters)
        return name

    def create_few_users(self) -> list:
        users = [User.objects.create(
            email=self.generate_name() + "@gmail.com",
            username=self.generate_name(),
            password="test12345678"
        ) for _ in range(50)]
        return users

    def create_few_chats(self, creator: User) -> list:
        chats = [group_chat_models.GroupChat.objects.create(
            name=self.generate_name(),
            creator=creator,
        ) for _ in range(0, 10)]
        return chats

    def setUp(self):
        admin = User.objects.create(username="admin", password="test12345678")
        self.users = self.create_few_users()
        self.chats = self.create_few_chats(admin)

    def test_something(self):
        self.assertEqual(len(self.chats), 10)
        self.assertEqual(len(self.users), 50)
