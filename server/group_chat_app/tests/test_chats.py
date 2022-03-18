from typing import Optional

from django.contrib.auth.models import Group
from rest_framework.test import APITestCase

from user_app.models import User
from user_app.tests.services.user_services import UserAuthAPITestService
from .services.chat_services import ChatAPITestService
from ..models import GroupChat, GroupChatRequest


class GroupChatTestCase(APITestCase):
    def get_admin_jwt(self) -> Optional[str]:
        return UserAuthAPITestService.login_user('Chat_admin', 'admin12345').json().get('access')

    def get_user_jwt(self, username: str, password: str) -> Optional[str]:
        return UserAuthAPITestService.login_user(username, password).json().get('access')

    def setUp(self) -> None:
        admin_group = Group.objects.create(name='Admin')
        user_group = Group.objects.create(name='User')

        admin_response = UserAuthAPITestService.create_user({
            'username': 'Chat_admin',
            'email': 'admin@mail.ru',
            'password': 'admin12345'
        })
        member_response = UserAuthAPITestService.create_user({
            'username': 'Chat_member',
            'email': 'member@mail.ru',
            'password': 'member12345'
        })
        not_member_response = UserAuthAPITestService.create_user({
            'username': 'Not_member',
            'email': 'notmember@mail.ru',
            'password': 'notmember12345'
        })
        UserAuthAPITestService.accept_all_users(User.objects.all())
        admin_group.user_set.add(User.objects.get(username='Chat_admin'))
        user_group.user_set.add(User.objects.get(username='Chat_member'))
        user_group.user_set.add(User.objects.get(username='Not_member'))

    def test_creating_chat(self):
        creating_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        getting_response = ChatAPITestService.get_list_chat(self.get_admin_jwt())

        self.assertEqual(creating_response.status_code, 201)
        self.assertEqual(len(getting_response.json()), 1)
        self.assertEqual(getting_response.json()[0]['creator']['username'], 'Chat_admin')

    def test_adding_user_in_chat(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        user = User.objects.get(username='Chat_member')
        request_response = ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_response.json().get('id'),
                                                                user.id)
        wrong_request_response = ChatAPITestService.send_chat_request(
            user_jwt=self.get_user_jwt('Not_member', 'notmember12345'),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )

        self.assertEqual(request_response.status_code, 201)
        self.assertEqual(wrong_request_response.status_code, 403)

    def test_accepting_user_in_chat(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        user = User.objects.get(username='Chat_member')
        member_jwt = self.get_user_jwt('Chat_member', 'member12345')
        ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_response.json().get('id'),
                                                                user.id)
        requests_response = ChatAPITestService.get_requests_to_user(
            user_jwt=member_jwt,
            user_id=user.id
        )
        requests_response_wrong = ChatAPITestService.get_requests_to_user(
            user_jwt=self.get_user_jwt('Chat_member', 'wrong_pwd12345'),
            user_id=user.id
        )

        accepted_response = ChatAPITestService.accept_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id')
        )

        accepted_response_wrong = ChatAPITestService.accept_request(
            user_jwt=self.get_user_jwt('Chat_member', 'wrong_pwd12345'),
            chat_id=chat_response.json().get('id')
        )

        self.assertEqual(requests_response.status_code, 200)
        self.assertEqual(requests_response_wrong.status_code, 401)
        self.assertEqual(accepted_response.status_code, 200)
        self.assertEqual(accepted_response_wrong.status_code, 401)
