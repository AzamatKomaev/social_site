from typing import Optional

from django.contrib.auth.models import Group
from rest_framework.test import APITestCase

from group_chat_app.tests.services.chat_services import ChatAPITestService
from user_app.models import User
from user_app.tests.data import users_data
from user_app.tests.services.user_services import UserAuthAPITestService


class GroupChatRoleTestCase(APITestCase):
    def get_admin_jwt(self) -> Optional[str]:
        return UserAuthAPITestService.get_user_jwt('admin', 'admin12345678')

    def get_users_dict(self, users) -> dict:
        return {user.username: user for user in users}

    def setUp(self) -> None:
        group = Group.objects.create(name='Пользователь')
        UserAuthAPITestService.create_user({"username": "admin", "email": "mail@mail.ru", "password": "admin12345678"})

        for user_data in users_data[:3]:
            UserAuthAPITestService.create_user(user_data)

        users = User.objects.all()
        UserAuthAPITestService.accept_all_users(users)

        for user in users:
            group.user_set.add(user)

    def test_getting_role(self):
        # creating a chat.
        users_dict = self.get_users_dict(User.objects.all())

        user1_jwt = UserAuthAPITestService.get_user_jwt('User1', 'the_same_password')
        user2_jwt = UserAuthAPITestService.get_user_jwt('User2', 'the_same_password')

        created_chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        self.assertEqual(created_chat_response.status_code, 201)
        chat_id = created_chat_response.json().get('id')

        # sending a request to User1 user.
        sent_chat_request_to_user1 = ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_id,
                                                                          users_dict['User1'].id)
        self.assertEqual(sent_chat_request_to_user1.status_code, 201)

        # accepting a request sent to User1 user.
        accepted_chat_request_to_user1 = ChatAPITestService.accept_request(user1_jwt, chat_id)
        self.assertEqual(accepted_chat_request_to_user1.status_code, 200)

        # trying to get member list of 'First Chat' chat as not member.
        gotten_chat_members_list_as_not_member = ChatAPITestService.get_members_list(user2_jwt, chat_id)
        self.assertEqual(gotten_chat_members_list_as_not_member.status_code, 403)

        # trying to get detail User1 member of 'First Chat' as not member.
        gotten_chat_member_detail_as_not_member = ChatAPITestService.get_member_detail(user2_jwt, chat_id,
                                                                                       users_dict['User1'].id)
        self.assertEqual(gotten_chat_member_detail_as_not_member.status_code, 403)

        # getting member list of 'First Chat' chat as member.
        gotten_chat_members_list_as_member = ChatAPITestService.get_members_list(user1_jwt, chat_id)
        self.assertEqual(gotten_chat_members_list_as_member.status_code, 200)
        self.assertEqual(len(gotten_chat_members_list_as_member.json()), 2)
        self.assertEqual(gotten_chat_members_list_as_member.json()[1].get('user_data').get('id'),
                         users_dict['User1'].id)

        # trying to send a request to User1 user (the user already in chat and is member).
        sent_chat_request_to_user1_invalid = ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_id,
                                                                                  users_dict['User1'].id)
        self.assertEqual(sent_chat_request_to_user1_invalid.status_code, 400)

        # trying to send a request to User2 user as not creator of the chat.
        sent_chat_request_to_user2_as_not_creator = ChatAPITestService.send_chat_request(user1_jwt, chat_id,
                                                                                         users_dict['User2'].id)
        self.assertEqual(sent_chat_request_to_user2_as_not_creator.status_code, 403)

