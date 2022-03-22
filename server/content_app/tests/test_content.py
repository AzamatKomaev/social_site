from django.contrib.auth.models import Group
from django.db.models import QuerySet

from rest_framework.test import APITestCase

from content_app.models import Category
from user_app.models import User
from user_app.tests.services.user_services import UserAuthAPITestService
from .services.content_services import ContentAPITestService


class ContentTestCase(APITestCase):
    def setUp(self):
        group = Group.objects.create(name='User')
        user1_response = UserAuthAPITestService.create_user({
            'username': 'User2',
            'email': 'user1@mail.ru',
            'password': 'user1_12345'
        })
        user2_response = UserAuthAPITestService.create_user({
            'username': 'User2',
            'email': 'user2@mail.ru',
            'password': 'user1_12345'
        })

        users = User.objects.all()
        UserAuthAPITestService.accept_all_users(users)
        group.user_set.add(users.first())
        group.user_set.add(users.last())

        Category.objects.create(name='First Category')
        Category.objects.create(name='Second Category')

    def test_creating_content(self):
        pass

    def test_getting_content(self):
        # getting all categories.
        gotten_categories_response = ContentAPITestService.get_categories()
        self.assertEqual(gotten_categories_response.status_code, 200)
        self.assertEqual(len(gotten_categories_response.json()), 2)


