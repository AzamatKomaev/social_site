from django.test import TestCase
from django.contrib.auth.models import User, Group

from .service.user_service import CreationUser
from .models import Token



class SocialTest(TestCase):
    """Данные для регистраций тестового пользователя."""
    data_for_reg_user = {
        'username': "Test_User",
        'email': "testusermail@gmail.com",
        'password1': "testpassword2"
    }

    def setUp(self):
        user = CreationUser(self.data_for_reg_user)
        user.send_message_with_code()

    def test_token_on_valid(self):
        """Тестим токен на валидность."""
        test_user = User.objects.get()
        test_user.groups.all()
        self.assertEqual(test_user.username, "Test_User")
