from django.test import TestCase
from django.contrib.auth.models import User, Group

from .service.user_service import CreationUser
from .models import Token


class SocialTest(TestCase):
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
