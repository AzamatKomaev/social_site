from django.urls import reverse
from rest_framework.test import APIClient

from user_app.models import User


class ChatAPITestService:
    client = APIClient()

    @staticmethod
    def send_and_accept_chat_request(admin_jwt: str, receiver_jwt: str, chat_id: int, receiver_id: int) -> bool:
        send_response = ChatAPITestService.send_chat_request(admin_jwt, chat_id, receiver_id)
        accept_response = ChatAPITestService.accept_request(receiver_jwt, chat_id)
        return send_response.status_code == 201 and accept_response.status_code == 200

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
    def get_detail_chat(user_jwt: str, chat_id: int):
        client = APIClient()
        url = reverse('group_chats.detail', args=[chat_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_requests_to_user(user_jwt: str, user_id: int):
        client = APIClient()
        url = reverse('group_chats_requests.to_user.list', args=[user_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_detail_request_to_user(user_jwt: str, chat_id: int, user_id: int):
        client = APIClient()
        url = reverse('group_chats_requests.to_user.detail', args=[chat_id, user_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def accept_request(user_jwt: str, chat_id: int):
        client = APIClient()
        url = reverse('group_chats_requests.list', args=[chat_id])
        return client.patch(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def delete_request(user_jwt: str, chat_id: int, user_id: int):
        client = APIClient()
        url = reverse('group_chats_requests.to_user.detail', args=[chat_id, user_id])
        return client.delete(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_members_list(user_jwt: str, chat_id: int):
        client = APIClient()
        url = reverse('group_chat_members.list', args=[chat_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_member_detail(user_jwt: str, chat_id: int, user_id: int):
        client = APIClient()
        url = reverse('group_chat_members.detail', args=[chat_id, user_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def change_member_role(user_jwt: str, chat_id: int, user_id: int, role: str):
        client = APIClient()
        url = reverse('group_chat_members.detail', args=[chat_id, user_id])
        data = {'role_name': role}
        return client.patch(url, data=data, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def delete_chat(user_jwt: str, chat_id: int):
        client = APIClient()
        url = reverse('group_chats.detail', args=[chat_id])
        return client.delete(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_messages_list(user_jwt: str, chat_id: int):
        client = APIClient()
        url = reverse('group_chats_messages.list', args=[chat_id])
        return client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def send_message(user_jwt: str, text: str, chat_id: int):
        client = APIClient()
        url = reverse('group_chats_messages.list', args=[chat_id])
        data = {
            'text': text, 'chat': chat_id
        }
        return client.post(url, data=data, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
