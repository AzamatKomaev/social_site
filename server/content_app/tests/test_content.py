from typing import Optional

from django.contrib.auth.models import Group
from django.db.models import QuerySet
from requests import Response

from rest_framework.test import APITestCase

from content_app.models import Category
from user_app.models import User
from user_app.tests.services.user_services import UserAuthAPITestService
from .services.content_services import ContentAPITestService


class ContentTestCase(APITestCase):
    users: QuerySet[User]
    categories: list[Category]

    def setUp(self):
        Group.objects.create(name='Пользователь')
        [
            UserAuthAPITestService.create_user(
                {'username': f'User{i}', 'email': f'mail{i}@mail.ru', 'password': 'the_same_password'}
            ) for i in range(0, 5)
        ]

        self.users = User.objects.all()
        UserAuthAPITestService.accept_all_users(self.users)
        self.categories = [
            Category.objects.create(name=f'Category {i}') for i in range(0, 5)
        ]

    def _create_posts(self, send_jwt: bool) -> list[Response]:
        responses = []
        for category in self.categories:
            for user in self.users:
                user_jwt = UserAuthAPITestService.login_user(
                    user.username, 'the_same_password'
                ).json().get('access') if send_jwt else None

                response = ContentAPITestService.create_post(
                    {"title": f"Title user-{user.id} category-{category.id}", "text": "lol", "category": category.id},
                    category_id=category.id, user_jwt=user_jwt
                )
                responses.append(response)

        return responses

    def test_set_up(self):
        users = User.objects.all()
        self.assertEqual(len(users), 5)
        self.assertEqual(len(self.categories), 5)

    def test_create_post(self):
        correct_created_post_responses = self._create_posts(send_jwt=True)
        non_correct_created_post_responses = self._create_posts(send_jwt=False)

        self.assertEqual(
            [201 for _ in range(len(correct_created_post_responses))],
            [response.status_code for response in correct_created_post_responses])

        self.assertEqual(
            [401 for _ in range(len(non_correct_created_post_responses))],
            [response.status_code for response in non_correct_created_post_responses]
        )
