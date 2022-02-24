from typing import Optional

from requests import Response

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient

from content_app.models import Category
from user_app.models import User


class ContentTestCase(APITestCase):
    users: list[User]
    categories: list[Category]

    def _get_user_jwt(self, auth_data) -> Optional[str]:
        client = APIClient()
        url = reverse("token_obtain_pair")

        response = client.post(url, data=auth_data, format='json')
        return response.json().get('access')

    def _create_post(self, detail_data: dict, category_id: int, user_jwt: str) -> Response:
        client = APIClient()
        url = reverse('post.list', args=[category_id])
        response = client.post(url, detail_data, format='json')
        return response

    def setUp(self):
        self.users = [
            User.objects.create_user(username=f'User {i}', email=f'mail{i}@mail.ru', password='the_same_password')
            for i in range(0, 10)
        ]
        self.categories = [
            Category.objects.create(name=f'Category {i}') for i in range(0, 5)
        ]

    def test_set_up(self):
        self.assertEqual(len(self.users), 10)
        self.assertEqual(len(self.categories), 5)

    def test_create_post(self):
        correct_created_post_responses = []

        for category in self.categories:
            for user in self.users:
                correct_created_post_responses.append(
                    self._create_post({"title": f"Title user-{user.id} category-{category.id}", "content": "lol"},
                                      category_id=category.id, user_jwt='f'))

