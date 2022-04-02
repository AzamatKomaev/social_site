import uuid
from typing import Optional, Union

from django.contrib.auth.models import Group
from django.db.models import QuerySet
from django.urls import reverse, NoReverseMatch
from requests import Response

from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from server.settings import BASE_DIR
from user_app.models import User
from .services.user_services import UserAuthAPITestService
from .data import users_data


class UserAPITestCase(APITestCase):
    json_users_path = BASE_DIR / 'user_app/tests/data/users_data.json'
    default_password = 'the_same_password'

    def setUp(self) -> None:
        Group.objects.create(name='Пользователь')

    def _set_up_friend_requests(self) -> dict[str, Union[QuerySet[User], User]]:
        self._create_users(users_data)
        UserAuthAPITestService.create_user({"username": "admin", "email": "mail@mail.ru", "password": "admin12345678"})

        admin = User.objects.get(username="admin")
        users = User.objects.all().exclude(id=admin.id)

        UserAuthAPITestService.accept_all_users(users)
        UserAuthAPITestService.accept_all_users([admin])

        return {'users': users, 'admin': admin}

    def _create_users(self, json_users: list) -> list[Response]:
        responses = [UserAuthAPITestService.create_user(user_data) for user_data in json_users]
        return responses

    def _login_many_users(self, users: list[User]):
        responses = []
        for user in users:
            response = UserAuthAPITestService.login_user(user.username, self.default_password)
            responses.append({
                user.id: {
                    "data": response.json(),
                    "status_code": response.status_code
                }
            })

        return responses

    def _find_user(self, user_id: Optional[int] = None, username: Optional[str] = None) -> Optional[Response]:
        client = APIClient()
        try:
            url = reverse('user.find_by_id', args=[user_id]) if user_id else reverse('user.find_by_username',
                                                                                     args=[username])
            response = client.get(url)
        except NoReverseMatch:
            return

        return response

    def _get_current_user_response(self, jwt: str) -> Response:
        url = reverse('current-user-data')
        client = APIClient()
        response = client.get(url, data=None, follow=False, HTTP_AUTHORIZATION=f'Bearer {jwt}')
        return response

    def _accept_several_users(self, users: QuerySet[User]) -> list[Response]:
        responses = []

        for user in users:
            accept_friend_request_response = UserAuthAPITestService.accept_friend_request(
                user_id=user.id,
                user_jwt=UserAuthAPITestService.login_user('admin', 'admin12345678').json().get('access'),
                is_accepted=1
            )
            responses.append(accept_friend_request_response)

        return responses

    def test_creating_users(self):
        responses = self._create_users(users_data)
        statuses = [response.status_code for response in responses]
        users = User.objects.all()
        self.assertEqual(len(responses)-4, users.count())
        self.assertEqual(statuses[5:], [status.HTTP_400_BAD_REQUEST for _ in range(4)])

        unique_statuses = list(set(statuses))
        unique_statuses.remove(400)
        self.assertEqual([unique_statuses[0], len(unique_statuses) == 1], [status.HTTP_201_CREATED, True])

    def test_accepting_users(self):
        self._create_users(users_data)

        users = User.objects.all()

        is_active_list = [user.is_active for user in users]
        wrong_requests_statuses = [UserAuthAPITestService.accept_user(uuid.uuid1()).status_code for _ in range(5)]
        correct_requests_statuses = [UserAuthAPITestService.accept_user(user.acceptauthtoken.token).status_code for user in users]

        self.assertEqual(is_active_list, [0 for _ in range(5)])
        self.assertEqual(wrong_requests_statuses, [404 for _ in range(5)])
        self.assertEqual(correct_requests_statuses, [200 for _ in range(5)])

    def test_login_users(self):
        self._create_users(users_data)
        users = User.objects.all()
        UserAuthAPITestService.accept_all_users(users)

        worst_response1 = UserAuthAPITestService.login_user('Invalid User', 'invalid_password')
        worst_response2 = UserAuthAPITestService.login_user()
        correct_responses = self._login_many_users(users)

        self.assertEqual(worst_response1.status_code, 401)
        self.assertIn('detail', worst_response1.json())

        self.assertEqual(worst_response2.status_code, 400)
        self.assertEqual('username' in worst_response2.json() and 'password' in worst_response2.json(), True)

        self.assertEqual(len(correct_responses), len(users))

        for response in correct_responses:
            for user_id, value in response.items():
                response = self._get_current_user_response(value['data']['access'])

                self.assertEqual(len(response.json()), 6)
                self.assertEqual(response.json()['id'], user_id)
                self.assertEqual(response.status_code, 200)

    def test_searching_user(self):
        self._create_users(users_data)
        users = User.objects.all()

        found_user_by_id = UserAuthAPITestService.find_user(user_id=users.first().id)
        found_user_by_username = UserAuthAPITestService.find_user(username=users.first().username)
        self.assertEqual(found_user_by_id.status_code, 200)
        self.assertEqual(found_user_by_username.status_code, 200)
        self.assertEqual(found_user_by_username.json(), found_user_by_id.json())


        found_user_by_invalid_id = UserAuthAPITestService.find_user(user_id=1000)
        fount_user_by_invalid_username = UserAuthAPITestService.find_user(username="aaaaaaaaa")

        self.assertEqual(found_user_by_invalid_id.status_code, 200)
        self.assertEqual(found_user_by_invalid_id.json(), [])
        self.assertEqual(fount_user_by_invalid_username.status_code, 200)
        self.assertEqual(fount_user_by_invalid_username.json(), [])

    def test_friend_requests_accepting(self):
        users, admin = self._set_up_friend_requests().values()
        admin_auth_response = UserAuthAPITestService.login_user(username="admin", password="admin12345678")

        sent_friend_requests = UserAuthAPITestService.send_several_friend_requests(
            users=users,
            user_jwt=admin_auth_response.json().get('access')
        )
        invalid_trying_sent_exists_friend_request = UserAuthAPITestService.send_friend_request(
            users.order_by('?').first().id, admin_auth_response.json().get('access')
        )

        self.assertEqual(users.count(), len(sent_friend_requests))
        self.assertEqual(
            [201 for _ in range(0, users.count())],
            [friend_request.status_code for friend_request in sent_friend_requests]
        )
        self.assertEqual(invalid_trying_sent_exists_friend_request.status_code, 400)

        invalid_accepted_friend_request_response = UserAuthAPITestService.accept_friend_request(
            user_id=users.exclude(username='User1').order_by('?').first().id,
            user_jwt=UserAuthAPITestService.login_user('User1', self.default_password).json().get('access', None),
            is_accepted=1
        )
        invalid_deleted_friend_request_response = UserAuthAPITestService.delete_friend_request(
            user_id=users.exclude(username='User1').order_by('?').first().id,
            user_jwt=UserAuthAPITestService.login_user('User1', self.default_password).json().get('access', None)
        )

        valid_accepted_friend_request_responses = UserAuthAPITestService.accept_several_friend_requests(
            user_id=admin.id, users=users, password=self.default_password
        )
        self.assertEqual(invalid_accepted_friend_request_response.status_code, 404)
        self.assertEqual(invalid_deleted_friend_request_response.status_code, 404)

        self.assertEqual(
            len(valid_accepted_friend_request_responses),
            users.count()
        )

        self.assertEqual(
            len(valid_accepted_friend_request_responses),
            len(tuple(filter(lambda response: response.status_code == 200, valid_accepted_friend_request_responses)))
        )

        user_friend_list_response = UserAuthAPITestService.get_friend_list(users.last().id)
        admin_friend_list_response = UserAuthAPITestService.get_friend_list(admin.id)

        self.assertEqual(
            [user_friend_list_response.status_code, len(user_friend_list_response.json())],
            [200, 1]
        )
        self.assertEqual(
            [admin_friend_list_response.status_code, len(admin_friend_list_response.json())],
            [200, users.count()]
        )

        deleted_non_exist_friend_request_response = UserAuthAPITestService.delete_friend_request(
            user_id=users[0].id,
            user_jwt=UserAuthAPITestService.get_user_jwt(users[1].username, 'the_same_password')
        )
        self.assertEqual(deleted_non_exist_friend_request_response.status_code, 404)

