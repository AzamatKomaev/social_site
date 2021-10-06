from django.test import TestCase
from django.contrib.auth.models import User

from .models import Post, Token


class SocialTest(TestCase):
    def setUp(self):
        User.objects.create(username="test_user", password="test_password")
        Post.objects.create(title="hi it is test", text="yeeaaaaaah", user_id=1)

    def test_first_name_max_length(self):
        post = Post.objects.get(id=1)
        self.assertEqual(post.id, 1)
