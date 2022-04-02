from typing import Union, Optional
from requests import Response

from django.db.models import QuerySet
from django.urls import reverse
from rest_framework.test import APIClient

from user_app.models import User


class UserAuthAPITestService:

    @staticmethod
    def get_user_jwt(username: str, password: str) -> Optional[str]:
        return UserAuthAPITestService.login_user(username, password).json().get('access')

    @staticmethod
    def create_user(user_data: dict) -> Response:
        client = APIClient()
        url = reverse('auth.register')
        response = client.post(url, user_data, format='json')
        return response

    @staticmethod
    def accept_user(token) -> Response:
        client = APIClient()
        url = reverse('auth.accept', args=[token])
        response = client.patch(url)
        return response

    @staticmethod
    def login_user(username=None, password=None) -> Response:
        client = APIClient()
        url = reverse("auth.login")
        if username and password:
            data = {"username": username, "password": password}
        else:
            data = {}

        response = client.post(url, data=data, format='json')
        return response

    @staticmethod
    def accept_all_users(users: Union[list[User], QuerySet[User]]) -> None:
        for user in users:
            user.is_active = True
            user.save()

    @staticmethod
    def accept_friend_request(user_id: int, user_jwt: str, is_accepted: int) -> Response:
        client = APIClient()
        url = reverse('friend_request.view_set', args=[user_id])
        response = client.patch(f"{url}?is_accepted={is_accepted}", HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
        return response

    @staticmethod
    def delete_friend_request(user_id: int, user_jwt: str) -> Response:
        client = APIClient()
        url = reverse('friend_request.view_set', args=[user_id])
        response = client.delete(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
        return response

    @staticmethod
    def get_friend_request_list(user_jwt: str) -> Response:
        client = APIClient()
        url = reverse('friend_request.list')
        response = client.get(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
        return response

    @staticmethod
    def get_friend_list(user_id: int) -> Response:
        client = APIClient()
        url = reverse('friend.list', args=[user_id])
        response = client.get(url)
        return response

    @staticmethod
    def send_friend_request(user_id: int, admin_jwt: str) -> Response:
        url = reverse('friend_request.view_set', args=[user_id])
        client = APIClient()
        response = client.post(url, HTTP_AUTHORIZATION=f'Bearer {admin_jwt}')
        return response

    @staticmethod
    def send_several_friend_requests(users: QuerySet[User], user_jwt: str) -> list[Response]:
        sent_friend_requests = [
            UserAuthAPITestService.send_friend_request(user.id, user_jwt)
            for user in users
        ]
        return sent_friend_requests

    @staticmethod
    def accept_several_friend_requests(users: QuerySet[User], user_id: int, password: str) -> tuple[Response]:
        responses = tuple((
            UserAuthAPITestService.accept_friend_request(
                user_id=user_id,
                user_jwt=UserAuthAPITestService.login_user(user.username, password).json().get('access'),
                is_accepted=1
            )
            for user in users
        ))
        return responses

    @staticmethod
    def find_user(user_id: Optional[int] = None, username: Optional[str] = None):
        client = APIClient()
        url = reverse('user.find')

        if user_id is not None:
            url = f"{url}?id={user_id}"

        elif username is not None:
            url = f"{url}?username={username}"

        return client.get(url)
