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
        self.assertEqual(creating_response.status_code, 201)

        creating_response_wrong = ChatAPITestService.create_chat(self.get_admin_jwt(), '')
        self.assertEqual(creating_response_wrong.status_code, 400)

        getting_response = ChatAPITestService.get_list_chat(self.get_admin_jwt())
        self.assertEqual(len(getting_response.json()), 1)
        self.assertEqual(getting_response.json()[0]['creator']['username'], 'Chat_admin')

    def test_deleting_chat(self):
        creating_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')


    def test_sending_request(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        user = User.objects.get(username='Chat_member')
        not_member_jwt = self.get_user_jwt('Not_member', 'notmember12345')
        member_jwt = self.get_user_jwt('Chat_member', 'member12345')

        request_response_as_not_member = ChatAPITestService.send_chat_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_not_member.status_code, 403)

        request_response_as_member = ChatAPITestService.send_chat_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_member.status_code, 403)

        request_response_as_admin1 = ChatAPITestService.send_chat_request(
            user_jwt=self.get_admin_jwt(),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_admin1.status_code, 201)

        request_response_as_admin2 = ChatAPITestService.send_chat_request(
            user_jwt=self.get_admin_jwt(),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_admin2.status_code, 400)

        wrong_request_response = ChatAPITestService.send_chat_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(wrong_request_response.status_code, 403)

    def test_accepting_user_in_chat(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        admin = User.objects.get(username='Chat_admin')
        user = User.objects.get(username='Chat_member')

        member_jwt = self.get_user_jwt('Chat_member', 'member12345')
        not_member_jwt = self.get_user_jwt('Not_member', 'notmember12345')

        ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_response.json().get('id'),
                                                                user.id)

        requests_response = ChatAPITestService.get_requests_to_user(
            user_jwt=member_jwt,
            user_id=user.id
        )
        self.assertEqual(requests_response.status_code, 200)

        requests_response_wrong = ChatAPITestService.get_requests_to_user(
            user_jwt=self.get_user_jwt('Chat_member', 'wrong_pwd12345'),
            user_id=user.id
        )
        self.assertEqual(requests_response_wrong.status_code, 401)

        accepted_response_wrong = ChatAPITestService.accept_request(
            user_jwt=self.get_user_jwt('Chat_member', 'wrong_pwd12345'),
            chat_id=chat_response.json().get('id')
        )
        self.assertEqual(accepted_response_wrong.status_code, 401)

        accepted_response = ChatAPITestService.accept_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id')
        )
        self.assertEqual(accepted_response.status_code, 200)


        members_list_response_as_member1 = ChatAPITestService.get_members_list(member_jwt,
                                                                               chat_response.json().get('id'))
        self.assertEqual(len(members_list_response_as_member1.json()), 2)
        self.assertEqual(members_list_response_as_member1.json()[0]['user_data']['id'], admin.id)
        self.assertEqual(members_list_response_as_member1.json()[1]['user_data']['id'], user.id)

        deleted_response_wrong = ChatAPITestService.delete_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(deleted_response_wrong.status_code, 403)

        deleted_response_as_member = ChatAPITestService.delete_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(deleted_response_as_member.status_code, 204)

        ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_response.json().get('id'),
                                             user.id)
        accepted_response_wrong_as_not_member = ChatAPITestService.accept_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id')
        )
        self.assertEqual(accepted_response_wrong_as_not_member.status_code, 404)

        deleted_response_as_admin = ChatAPITestService.delete_request(
            user_jwt=self.get_admin_jwt(),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(deleted_response_as_admin.status_code, 204)

        members_list_response_as_member2 = ChatAPITestService.get_members_list(member_jwt,
                                                                               chat_response.json().get('id'))
        self.assertEqual(len(members_list_response_as_member2.json()), 1)

        members_list_response_as_not_member = ChatAPITestService.get_members_list(not_member_jwt,
                                                                                  chat_response.json().get('id'))
        self.assertEqual(members_list_response_as_not_member.status_code, 403)
