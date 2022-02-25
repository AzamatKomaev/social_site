from typing import Optional
from requests import Response

from django.urls import reverse
from rest_framework.test import APIClient


class ContentAPITestService:
    @staticmethod
    def create_post(detail_data: dict, category_id: int, user_jwt: Optional[str]) -> Response:
        client = APIClient()
        url = reverse('post.list', args=[category_id])
        response = client.post(url, detail_data, format='json', HTTP_AUTHORIZATION=f'Bearer {user_jwt}')
        return response

