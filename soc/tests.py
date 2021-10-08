from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User, Group

from .service.user_service import CreationUser
from .service.content_service import get_post_data

from .models import Token, Post


class UserTest(TestCase):
    """Данные для регистраций тестового пользователя."""
    user = ""

    data_for_reg_user = {
        'username': "Test_User",
        'email': "testusermail@gmail.com",
        'password1': "test_password2"
    }

    def setUp(self):
        """Создаем тестового пользователя и группу."""
        self.user = CreationUser(self.data_for_reg_user)
        self.user.send_message_with_code()
        Group.objects.create(name="test_group")

    def test_token_on_valid(self):
        """Тестируем токен на валидность"""
        test_user = User.objects.get()
        token = Token.objects.get(user_id=test_user.id).token

        self.assertEqual(len(token), 50) #test token on size
        self.assertEqual(token, self.user.token) #test token on valid


class ContentTest(TestCase):
    """Класс для тестирования различного контента сайта."""
    posts = {
        'post1': "",
        'post2': "",
        'post3': "",
        'post4': "",
        'post5': ""
    }

    test_post_data = {
        'title': 'test_post_data_title',
        'text': 'test_post_data_text',
        'image': 'test_post_data_image'
    }

    request = ""

    def setUp(self):
        """Создаем несколько постов  и request для test_user."""
        test_user = User.objects.create(username="test_user", password="test_password")
        self.request = RequestFactory()
        self.request.user = test_user

        self.posts['post1'] = Post.objects.create(title="test1_title", text="test1_text", user_id=test_user.id)
        self.posts['post2'] = Post.objects.create(title="test2_title", text="test2_text", user_id=test_user.id)
        self.posts['post3'] = Post.objects.create(title="test3_title", text="test3_text", user_id=test_user.id)
        self.posts['post4'] = Post.objects.create(title="test4_title", text="test4_text", user_id=test_user.id)
        self.posts['post5'] = Post.objects.create(title="test5_title", text="test5_text", user_id=test_user.id)

    def test_getting_data_about_post(self):
        data_post = get_post_data(self.request, self.test_post_data)
        result_data = {
            'title': 'test_post_data_title',
            'text': 'test_post_data_text',
            'image': 'test_post_data_image',
            'user_id': self.request.user.id
        }

        self.assertEqual(data_post, result_data)
