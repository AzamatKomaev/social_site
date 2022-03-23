from typing import Optional
from requests import Response

from django.urls import reverse
from rest_framework.test import APIClient


class ContentAPITestService:
    @staticmethod
    def get_categories():
        client = APIClient()
        url = reverse('categories.list')
        return client.get(url)

    @staticmethod
    def create_post(detail_data: dict, category_id: int, user_jwt: Optional[str]) -> Response:
        client = APIClient()
        url = reverse('posts.list', args=[category_id])
        return client.post(url, {**detail_data, **{'category': category_id}}, format='json',
                            HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_post_list(category_id: int):
        client = APIClient()
        url = reverse('posts.list', args=[category_id])
        return client.get(url)

    @staticmethod
    def get_post_detail(post_id: int):
        client = APIClient()
        url = reverse('posts.detail', args=[post_id])
        return client.get(url)

    @staticmethod
    def delete_post(user_jwt: str, post_id: int):
        client = APIClient()
        url = reverse('posts.detail', args=[post_id])
        return client.delete(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
