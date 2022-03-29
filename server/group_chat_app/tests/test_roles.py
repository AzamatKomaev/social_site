from typing import Optional

from django.contrib.auth.models import Group
from rest_framework.test import APITestCase

from user_app.tests.data import
from user_app.tests.services.user_services import UserAuthAPITestService


class GroupChatRoleTestCase(APITestCase):
    def get_admin_jwt(self) -> Optional[str]:
        return UserAuthAPITestService.get_user_jwt('admin', 'admin123456789')

    def setUp(self) -> None:
        Group.objects.create(name='Пользователь')
        UserAuthAPITestService.create_user({"username": "admin", "email": "mail@mail.ru", "password": "admin12345678"})


