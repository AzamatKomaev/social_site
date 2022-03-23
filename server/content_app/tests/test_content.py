from typing import Optional

from django.contrib.auth.models import Group
from django.db.models import QuerySet

from rest_framework.test import APITestCase

from content_app.models import Category
from user_app.models import User
from user_app.tests.services.user_services import UserAuthAPITestService
from .services.content_services import ContentAPITestService


class ContentTestCase(APITestCase):
    def get_user_jwt(self, username: str, password: str) -> Optional[str]:
        return UserAuthAPITestService.login_user(username, password).json().get('access')


    def setUp(self):
        group = Group.objects.create(name='User')
        user1_response = UserAuthAPITestService.create_user({
            'username': 'User1',
            'email': 'user1@mail.ru',
            'password': 'same_password'
        })
        user2_response = UserAuthAPITestService.create_user({
            'username': 'User2',
            'email': 'user2@mail.ru',
            'password': 'same_password'
        })

        users = User.objects.all()
        UserAuthAPITestService.accept_all_users(users)
        group.user_set.add(users.first())
        group.user_set.add(users.last())

        Category.objects.create(name='First Category')
        Category.objects.create(name='Second Category')

    def test_creating_content(self):
        category_id = Category.objects.first().id
        # trying to create a post with invalid user jwt.
        created_post_response_as_non_auth = ContentAPITestService.create_post(
            user_jwt='some_string',
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category_id
        )
        self.assertEqual(created_post_response_as_non_auth.status_code, 401)

        # trying to create a post with invalid title.
        created_post_response_with_invalid_title = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': '', 'text': 'Text2'},
            category_id=category_id
        )
        self.assertEqual(created_post_response_with_invalid_title.status_code, 400)
        self.assertIn('title', created_post_response_with_invalid_title.json())
        self.assertEqual(created_post_response_with_invalid_title.json()['title'], ['Это поле не может быть пустым.'])

        # trying to create a post with invalid text.
        created_post_response_with_invalid_text = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title3', 'text': ''},
            category_id=category_id
        )
        self.assertEqual(created_post_response_with_invalid_text.status_code, 400)
        self.assertIn('text', created_post_response_with_invalid_text.json())
        self.assertEqual(created_post_response_with_invalid_text.json()['text'], ['Это поле не может быть пустым.'])

        # trying to create a post with invalid title and text.
        created_post_response_with_invalid_title_and_text = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': '', 'text': ''},
            category_id=category_id
        )
        self.assertIn('title', created_post_response_with_invalid_title_and_text.json())
        self.assertIn('text', created_post_response_with_invalid_title_and_text.json())
        self.assertEqual(created_post_response_with_invalid_title_and_text.status_code, 400)

        # creating a post in the first category.
        created_post_response = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title4', 'text': 'Text4'},
            category_id=category_id
        )
        self.assertEqual(created_post_response.status_code, 201)
        self.assertEqual(created_post_response.json().get('category'), category_id)

    def test_getting_content(self):
        # getting all categories.
        gotten_categories_response = ContentAPITestService.get_categories()
        category1_id = gotten_categories_response.json()[0].get('id')
        category2_id = gotten_categories_response.json()[1].get('id')

        self.assertEqual(gotten_categories_response.status_code, 200)
        self.assertEqual(len(gotten_categories_response.json()), 2)

        # creating a post as User1 in First Category
        created_post_response_as_user1_in_category1 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category1_id
        )
        self.assertEqual(created_post_response_as_user1_in_category1.status_code, 201)

        # creating a post as User2 in Second Category.
        created_post_response_as_user2_in_category2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title2', 'text': 'Text2'},
            category_id=category2_id
        )
        self.assertEqual(created_post_response_as_user2_in_category2.status_code, 201)

        # getting First Category post list.
        gotten_post_list_response_by_category1 = ContentAPITestService.get_post_list(category1_id)
        self.assertEqual(gotten_post_list_response_by_category1.status_code, 200)
        self.assertEqual(len(gotten_post_list_response_by_category1.json()), 1)
        self.assertEqual(
            gotten_post_list_response_by_category1.json()[0].get('id'),
            created_post_response_as_user1_in_category1.json().get('id')
        )

        # getting Second Category post list.
        gotten_post_list_response_by_category2 = ContentAPITestService.get_post_list(category2_id)
        self.assertEqual(gotten_post_list_response_by_category2.status_code, 200)
        self.assertEqual(len(gotten_post_list_response_by_category2.json()), 1)
        self.assertEqual(
            gotten_post_list_response_by_category2.json()[0].get('id'),
            created_post_response_as_user2_in_category2.json().get('id')
        )

        # creating a post as User1 in Second Category
        created_post_response_as_user1_in_category2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title3', 'text': 'Text3'},
            category_id=category2_id
        )
        self.assertEqual(created_post_response_as_user1_in_category2.status_code, 201)

        # creating a post as User2 in First Category
        created_post_response_as_user2_in_category2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            detail_data={'title': 'Title4', 'text': 'Text4'},
            category_id=category1_id
        )
        self.assertEqual(created_post_response_as_user2_in_category2.status_code, 201)

        # getting First Category post list.
        gotten_post_list_response1_by_category1 = ContentAPITestService.get_post_list(category1_id)
        self.assertEqual(gotten_post_list_response1_by_category1.status_code, 200)
        self.assertEqual(len(gotten_post_list_response1_by_category1.json()), 2)

        # getting Second Category post list.
        gotten_post_list_response2_by_category2 = ContentAPITestService.get_post_list(category2_id)
        self.assertEqual(gotten_post_list_response2_by_category2.status_code, 200)
        self.assertEqual(len(gotten_post_list_response2_by_category2.json()), 2)

        gotten_post_detail_response1 = ContentAPITestService.get_post_detail(
            gotten_post_list_response1_by_category1.json()[1].get('id')
        )
        self.assertEqual(gotten_post_detail_response1.status_code, 200)
        self.assertEqual(
            gotten_post_detail_response1.json().get('id'),
            gotten_post_list_response1_by_category1.json()[1].get('id')
        )

        gotten_post_detail_response2 = ContentAPITestService.get_post_detail(
            gotten_post_list_response2_by_category2.json()[1].get('id')
        )
        self.assertEqual(gotten_post_detail_response2.status_code, 200)
        self.assertEqual(
            gotten_post_detail_response2.json().get('id'),
            gotten_post_list_response2_by_category2.json()[1].get('id')
        )

        gotten_non_exists_post_detail_response = ContentAPITestService.get_post_detail(post_id=100)
        self.assertEqual(gotten_non_exists_post_detail_response.status_code, 404)

    def test_deleting_content(self):
        # creating a post in the first category.
        category_id = Category.objects.first().id

        # creating a couple of posts.
        created_post_response1 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category_id
        )

        created_post_response2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            detail_data={'title': 'Title2', 'text': 'Text2'},
            category_id=category_id
        )

        # trying to delete the post as anonymous.
        deleted_post_response1_as_anonymous = ContentAPITestService.delete_post(
            user_jwt='',
            post_id=created_post_response1.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_anonymous.status_code, 401)

        # trying to delete the post as not creator.
        deleted_post_response1_as_not_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            post_id=created_post_response1.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_not_creator.status_code, 403)
        self.assertIn('detail', deleted_post_response1_as_not_creator.json())
        self.assertEqual(
            deleted_post_response1_as_not_creator.json()['detail'],
            'У вас недостаточно прав для выполнения данного действия.'
        )

        # deleting a chat as creator of the chat.
        deleted_post_response1_as_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            post_id=created_post_response1.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_creator.status_code, 204)

        # trying to get a chat that was deleted above.
        gotten_post_response1 = ContentAPITestService.get_post_detail(created_post_response1.json().get('id'))
        self.assertEqual(gotten_post_response1.status_code, 404)

        # getting a chat that wasn't deleted.
        gotten_post_response2 = ContentAPITestService.get_post_detail(created_post_response2.json().get('id'))
        self.assertEqual(gotten_post_response2.status_code, 200)

        # trying to delete the chat from Second Category from User2 as User1.
        deleted_post_response2_as_not_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            post_id=created_post_response2.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_not_creator.status_code, 403)
        self.assertIn('detail', deleted_post_response1_as_not_creator.json())
        self.assertEqual(
            deleted_post_response1_as_not_creator.json()['detail'],
            'У вас недостаточно прав для выполнения данного действия.'
        )

        # deleting the chat as creator.
        deleted_post_response2_as_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            post_id=created_post_response2.json().get('id')
        )
        self.assertEqual(deleted_post_response2_as_creator.status_code, 204)
