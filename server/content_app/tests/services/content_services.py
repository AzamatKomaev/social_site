from typing import Optional, Union
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
    def get_detail_category(category_id: int):
        client = APIClient()
        url = reverse('categories.detail', args=[category_id])
        return client.get(url)

    @staticmethod
    def create_post(detail_data: dict, category_id: int, user_jwt: Optional[str]) -> Response:
        client = APIClient()
        url = reverse('posts.list')
        return client.post(url, {**detail_data, **{'category': category_id}}, format='json',
                            HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_post_list(category_id: int):
        client = APIClient()
        url = reverse('posts.list')
        return client.get(url, QUERY_STRING=f'category__id={category_id}')

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

    @staticmethod
    def create_comment(user_jwt: str, data: dict[str, Union[str, int]]):
        client = APIClient()
        url = reverse('comments.list', args=[data.get('post')])
        return client.post(url, data=data, format='json', HTTP_AUTHORIZATION=f'Bearer {user_jwt}')

    @staticmethod
    def get_comment_list(post_id: int):
        client = APIClient()
        url = reverse('comments.list', args=[post_id])
        return client.get(url)

    @staticmethod
    def get_comment_detail(comment_id: int):
        client = APIClient()
        url = reverse('comments.detail', args=[comment_id])
        return client.get(url)

    @staticmethod
    def delete_comment(user_jwt: str, comment_id: int):
        client = APIClient()
        url = reverse('comments.detail', args=[comment_id])
        return client.delete(url, HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
