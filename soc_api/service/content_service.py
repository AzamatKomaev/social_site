from typing import Union

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from soc.models import Post
from soc_api.models import TokenWasUsed
from soc_api.serializers import PostSerializer, UserSerializer


class BaseService:
    def __init__(self, request):
        self.request = request
        self.key = request.META["HTTP_AUTHORIZATION"].split()[1]

    def _use_token(self) -> bool:
        """Метод, сообщающий об использований токена."""
        token_model = TokenWasUsed.objects.get(token=self.key)
        """
            Добавляем к полю how_many_used цифру 1, т.к используем его прямо сейчас
            и проверяем, закончился ли лимит использования токена
        """
        how_many_used = token_model.how_many_used
        if not how_many_used > 500:
            token_model.how_many_used = how_many_used + 1
            token_model.save()
            return True

        return False


class PostService(BaseService):

    def get_serializer(self) -> Union[PostSerializer or bool]:
        """Метод для возврата сериализатора get-запроса"""
        if self.request.method == "GET":
            posts = Post.objects.all().order_by('-id')
            serializer = PostSerializer(posts, many=True)
        else:
            serializer = PostSerializer(data=self.request.data, context={'request': self.request})

        is_token_was_successfully_used = self._use_token()

        if not is_token_was_successfully_used:
            return False

        return serializer

    def get_detail_serializer(self, pk: int) -> Union[PostSerializer or bool]:
        """Метод для возврата детального сериализатора."""
        post = Post.objects.get(pk=pk)
        serializer = PostSerializer(post)
        is_token_was_successfully_used = self._use_token()
        if not is_token_was_successfully_used:
            return False

        return serializer


class UserService(BaseService):

    def get_serializer(self) -> Union[UserSerializer or bool]:
        users = User.objects.all().order_by('-id')
        serializer = UserSerializer(users, many=True)

        is_token_was_successfully_used = self._use_token()
        if not is_token_was_successfully_used:
            return False

        return serializer

    def get_detail_serializer(self, username: str) -> Union[UserSerializer or bool]:
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)

        is_token_was_successfully_used = self._use_token()
        if not is_token_was_successfully_used:
            return False

        return serializer
