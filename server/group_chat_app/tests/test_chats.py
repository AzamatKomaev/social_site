from typing import Optional

from django.contrib.auth.models import Group
from rest_framework.test import APITestCase

from user_app.models import User
from user_app.tests.services.user_services import UserAuthAPITestService
from .services.chat_services import ChatAPITestService


class GroupChatTestCase(APITestCase):
    def get_admin_jwt(self) -> Optional[str]:
        return UserAuthAPITestService.get_user_jwt('Chat_admin', 'admin12345')

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

        users = User.objects.all()
        UserAuthAPITestService.accept_all_users(users)
        admin_group.user_set.add(User.objects.get(username='Chat_admin'))
        user_group.user_set.add(User.objects.get(username='Chat_member'))
        user_group.user_set.add(User.objects.get(username='Not_member'))

    def test_creating_chat(self):
        # creating chat.
        creating_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        self.assertEqual(creating_response.status_code, 201)

        # trying to create chat with invalid name.
        creating_response_wrong = ChatAPITestService.create_chat(self.get_admin_jwt(), '')
        self.assertEqual(creating_response_wrong.status_code, 400)

    def test_getting_chat(self):
        # create a chat.
        not_member_jwt = UserAuthAPITestService.get_user_jwt('Not_member', 'notmember12345')
        member_jwt = UserAuthAPITestService.get_user_jwt('Chat_member', 'member12345')

        created_chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')

        # getting admin chat list.
        getting_admin_list_request_response = ChatAPITestService.get_list_chat(self.get_admin_jwt())
        self.assertEqual(len(getting_admin_list_request_response.json()), 1)
        self.assertEqual(getting_admin_list_request_response.json()[0]['id'], created_chat_response.json().get('id'))
        self.assertEqual(getting_admin_list_request_response.json()[0]['creator']['username'], 'Chat_admin')

        # getting Chat_member chat list.
        getting_user_list_request_response = ChatAPITestService.get_list_chat(member_jwt)
        self.assertEqual(getting_user_list_request_response.json(), [])

        # trying to get detail chat as not member.
        getting_detail_chat_response_as_not_member = ChatAPITestService.get_detail_chat(not_member_jwt,
                                                                          created_chat_response.json().get('id'))
        self.assertEqual(getting_detail_chat_response_as_not_member.status_code, 403)

        #getting detail chat as member (admin).
        getting_detail_chat_response_as_member = ChatAPITestService.get_detail_chat(self.get_admin_jwt(),
                                                                                    created_chat_response.json().get('id'))
        self.assertEqual(getting_detail_chat_response_as_member.status_code, 200)

        #trying to get chat members as not member.
        getting_chat_members_response_as_not_member = ChatAPITestService.get_members_list(not_member_jwt,
                                                                                          created_chat_response.json().get('id'))
        self.assertEqual(getting_chat_members_response_as_not_member.status_code, 403)

        #getting chat members as member (admin).
        getting_chat_members_response_as_member = ChatAPITestService.get_members_list(self.get_admin_jwt(),
                                                                                      created_chat_response.json().get('id'))
        self.assertEqual(getting_chat_members_response_as_member.status_code, 200)

    def test_deleting_chat(self):
        not_member_jwt = UserAuthAPITestService.get_user_jwt('Not_member', 'notmember12345')

        # creating a chat.
        created_chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')

        # trying to delete the chat as not creator (admin).
        deleted_chat_response_as_not_creator = ChatAPITestService.delete_chat(not_member_jwt,
                                                                              created_chat_response.json().get('id'))
        self.assertEqual(deleted_chat_response_as_not_creator.status_code, 403)

        # deleting the chat as creator (admin).
        deleted_chat_response_as_creator = ChatAPITestService.delete_chat(self.get_admin_jwt(),
                                                                          created_chat_response.json().get('id'))
        self.assertEqual(deleted_chat_response_as_creator.status_code, 204)

    def test_sending_request(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        user = User.objects.get(username='Chat_member')
        not_member_jwt = UserAuthAPITestService.get_user_jwt('Not_member', 'notmember12345')
        member_jwt = UserAuthAPITestService.get_user_jwt('Chat_member', 'member12345')

        # trying to send a chat request to the user as not admin of the chat.
        request_response_as_not_member = ChatAPITestService.send_chat_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_not_member.status_code, 403)

        # trying to send a chat request to the user as member of the chat.
        request_response_as_member = ChatAPITestService.send_chat_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_member.status_code, 403)

        # sending a chat request to the user as admin of the chat
        request_response_as_admin1 = ChatAPITestService.send_chat_request(
            user_jwt=self.get_admin_jwt(),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_admin1.status_code, 201)

        # sending a chat request to the user as admin of the chat,
        # but the chat request to the user has already created.
        request_response_as_admin2 = ChatAPITestService.send_chat_request(
            user_jwt=self.get_admin_jwt(),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(request_response_as_admin2.status_code, 400)

        # sending a chat request to the user as not admin of the chat,
        # but the chat request to the user has already created.
        wrong_request_response = ChatAPITestService.send_chat_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(wrong_request_response.status_code, 400)

    def test_accepting_user_in_chat(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        admin = User.objects.get(username='Chat_admin')
        user = User.objects.get(username='Chat_member')

        member_jwt = UserAuthAPITestService.get_user_jwt('Chat_member', 'member12345')
        not_member_jwt = UserAuthAPITestService.get_user_jwt('Not_member', 'notmember12345')

        # sending a chat request to the user named Chat_member from the chat.
        ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_response.json().get('id'),
                                                                user.id)

        # getting all chat requests to the user named Chat_member.
        requests_response = ChatAPITestService.get_requests_to_user(
            user_jwt=member_jwt,
            user_id=user.id
        )
        self.assertEqual(requests_response.status_code, 200)
        self.assertEqual(len(requests_response.json()), 1)
        self.assertEqual(requests_response.json()[0]['is_accepted'], False)

        # trying to get all chat requests to the user named Chat_member with invalid user_jwt.
        requests_response_wrong = ChatAPITestService.get_requests_to_user(
            user_jwt=UserAuthAPITestService.get_user_jwt('Chat_member', 'wrong_pwd12345'),
            user_id=user.id
        )
        self.assertEqual(requests_response_wrong.status_code, 401)

        # trying to accept the chat request sent above with invalid user_jwt
        accepted_response_wrong = ChatAPITestService.accept_request(
            user_jwt=UserAuthAPITestService.get_user_jwt('Chat_member', 'wrong_pwd12345'),
            chat_id=chat_response.json().get('id')
        )
        self.assertEqual(accepted_response_wrong.status_code, 401)

        # accepting the chat request.
        accepted_response = ChatAPITestService.accept_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id')
        )
        self.assertEqual(accepted_response.status_code, 200)

        # getting the accepted chat request as a member of the chat (to whom the chat request was sent above)
        detail_request_response_as_member = ChatAPITestService.get_detail_request_to_user(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(detail_request_response_as_member.status_code, 200)
        self.assertEqual(detail_request_response_as_member.json()['is_accepted'], True)

        # trying to get the accepted chat request as not a member of the chat and
        # is not user to whom the chat request was sent above
        detail_request_response_as_not_member = ChatAPITestService.get_detail_request_to_user(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(detail_request_response_as_not_member.status_code, 403)

        # getting all not accepted chat requests to the user.
        requests_response2 = ChatAPITestService.get_requests_to_user(
            user_jwt=member_jwt,
            user_id=user.id
        )
        self.assertEqual(requests_response2.status_code, 200)
        self.assertEqual(len(requests_response2.json()), 0)

        # getting all members of the chat.
        members_list_response_as_member1 = ChatAPITestService.get_members_list(member_jwt,
                                                                               chat_response.json().get('id'))
        self.assertEqual(len(members_list_response_as_member1.json()), 2)
        self.assertEqual(members_list_response_as_member1.json()[0]['user_data']['id'], admin.id)
        self.assertEqual(members_list_response_as_member1.json()[1]['user_data']['id'], user.id)

        # trying to delete the chat requests and also delete from chat members.
        # only a user to whom a chat request was sent or an admin of a chat can delete chat requests.
        deleted_response_wrong = ChatAPITestService.delete_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(deleted_response_wrong.status_code, 403)

        # deleting the chat request and leaving the chat if a user in it as one to whom the chat request was sent.
        deleted_response_as_member = ChatAPITestService.delete_request(
            user_jwt=member_jwt,
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(deleted_response_as_member.status_code, 204)

        # sending a chat request again.
        ChatAPITestService.send_chat_request(self.get_admin_jwt(), chat_response.json().get('id'),
                                             user.id)

        # trying to accept a chat request that doesn't exist.
        accepted_response_wrong_as_not_member = ChatAPITestService.accept_request(
            user_jwt=not_member_jwt,
            chat_id=chat_response.json().get('id')
        )
        self.assertEqual(accepted_response_wrong_as_not_member.status_code, 404)

        # deleting the chat request as admin of the chat.
        deleted_response_as_admin = ChatAPITestService.delete_request(
            user_jwt=self.get_admin_jwt(),
            chat_id=chat_response.json().get('id'),
            user_id=user.id
        )
        self.assertEqual(deleted_response_as_admin.status_code, 204)

        # getting all chat members as a member of the chat.
        members_list_response_as_member2 = ChatAPITestService.get_members_list(member_jwt,
                                                                               chat_response.json().get('id'))
        self.assertEqual(len(members_list_response_as_member2.json()), 1)

        # trying to get all chat members as a not member of the chat.
        members_list_response_as_not_member = ChatAPITestService.get_members_list(not_member_jwt,
                                                                                  chat_response.json().get('id'))
        self.assertEqual(members_list_response_as_not_member.status_code, 403)

    def test_group_chat_messages(self):
        chat_response = ChatAPITestService.create_chat(self.get_admin_jwt(), 'First Chat')
        member = User.objects.get(username='Chat_member')
        member_jwt = UserAuthAPITestService.get_user_jwt('Chat_member', 'member12345')
        not_member_jwt = UserAuthAPITestService.get_user_jwt('Not_member', 'notmember12345')

        # sending and accepting a chat request to the Chat_member user.
        is_chat_request_sent_and_accepted = ChatAPITestService.send_and_accept_chat_request(
            admin_jwt=self.get_admin_jwt(),
            receiver_jwt=member_jwt,
            chat_id=chat_response.json().get('id'),
            receiver_id=member.id
        )
        self.assertEqual(is_chat_request_sent_and_accepted, True)

        # trying to send a message in the chat as not member of the chat.
        sent_chat_message_as_not_member = ChatAPITestService.send_message(not_member_jwt, 'Monsters',
                                                                          chat_response.json().get('id'))
        self.assertEqual(sent_chat_message_as_not_member.status_code, 403)

        # trying to send a message in chat with invalid text as member of the chat.
        sent_chat_message_as_member_invalid = ChatAPITestService.send_message(member_jwt, '',
                                                                              chat_response.json().get('id'))
        self.assertEqual(sent_chat_message_as_member_invalid.status_code, 400)
        self.assertIn('text', sent_chat_message_as_member_invalid.json())

        # sending several messages in chat as member of the chat.
        sent_chat_messages_as_member = (
            ChatAPITestService.send_message(member_jwt, f'Member Message {i}', chat_response.json().get('id'))
            for i in range(5)
        )
        self.assertEqual([request.status_code for request in sent_chat_messages_as_member], [201 for _ in range(5)])

        # sending several messages in chat as admin of the chat.
        sent_chat_messages_as_admin = (
            ChatAPITestService.send_message(self.get_admin_jwt(), f'Admin Message {i}', chat_response.json().get('id'))
            for i in range(5)
        )
        self.assertEqual([request.status_code for request in sent_chat_messages_as_admin], [201 for _ in range(5)])

        # trying to get group chat messages as not member of the chat.
        messages_list_response_as_not_member = ChatAPITestService.get_messages_list(not_member_jwt,
                                                                                    chat_response.json().get('id'))
        self.assertEqual(messages_list_response_as_not_member.status_code, 403)
