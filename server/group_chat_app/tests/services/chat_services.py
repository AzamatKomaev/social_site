from django.urls import reverse
from rest_framework.test import APIClient

from user_app.models import User


class ChatAPITestService:
    client = APIClient()

    @staticmethod
    def create_chat(user_jwt: str, name: str):
        client = APIClient()
        url = reverse('group_chats.list')
        data = {'name': name}
        return client.post(url, data,  HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def send_chat_request(user_jwt: str, chat_id: int, user_id: int):
        client = APIClient()
        url = reverse('group_chats_requests.to_user.detail', args=[chat_id, user_id])
        return client.post(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_list_chat(user_jwt: str):
        client = APIClient()
        url = reverse('group_chats.list')
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_requests_to_user(user_jwt: str, user_id: int):
        client = APIClient()
        url = reverse('group_chats_requests.to_user.list', args=[user_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def accept_request(user_jwt: str, chat_id: str):
        client = APIClient()
        url = reverse('group_chats_requests.list', args=[chat_id])
        return client.patch(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
