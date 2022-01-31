import json
import uuid

from django.contrib.auth.models import Group
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.response import Response

from server.settings import BASE_DIR
from user_app.models import User


class UserAPITestCase(APITestCase):
    json_users_path = BASE_DIR / 'user_app/test_data/user_data.json'

    def setUp(self):
        f = open(self.json_users_path, 'r')
        self.users_dict = json.loads(f.read())
        Group.objects.create(name='Пользователь')

    def _create_users(self, json_users: dict) -> list[Response]:
        url = reverse('register-user')
        responses = [self.client.post(url, user_data, format='json') for user_data in json_users]
        return responses

    def _accept_user(self, token) -> Response:
        url = reverse('accept-user', args=[token])
        response = self.client.patch(url)
        return response

    def test_creating_users(self):
        responses = self._create_users(self.users_dict)
        statuses = [response.status_code for response in responses]
        users = User.objects.all()

        self.assertEqual(len(responses)-4, users.count())
        self.assertEqual(statuses[5:], [status.HTTP_400_BAD_REQUEST for _ in range(4)])

        unique_statuses = list(set(statuses))
        unique_statuses.remove(400)
        self.assertEqual([unique_statuses[0], len(unique_statuses) == 1], [status.HTTP_201_CREATED, True])

    def test_accepting_users(self):
        self._create_users(self.users_dict)

        users = User.objects.all()

        is_active_list = [user.is_active for user in users]
        wrong_requests_statuses = [self._accept_user(uuid.uuid1()).status_code for _ in range(5)]
        correct_requests_statuses = [self._accept_user(user.acceptauthtoken.token).status_code for user in users]

        self.assertEqual(is_active_list, [0 for _ in range(5)])
        self.assertEqual(wrong_requests_statuses, [404 for _ in range(5)])
        self.assertEqual(correct_requests_statuses, [200 for _ in range(5)])
