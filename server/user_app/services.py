import random
import string
from typing import Optional, Union

from django.contrib.auth.models import Group
from django.db.models import QuerySet, Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.request import Request

from content_app.models import Post, Comment
from .models import User, AcceptAuthToken, FriendRequest
from .tasks import send_mail_with_accepting_token
try:
    from server.settings import EMAIL_HOST_USER
except ImportError:
    EMAIL_HOST_USER = ""
from .permissions import UserIsNotReceiver


class CreationUser:
    """Class for creating user, who wants to register."""
    _token: str = ""
    user: User

    def __init__(self, data: dict) -> None:
        self.username = data['username']
        self.email = data['email']
        self.password = data['password']

    def _create_and_setting_user(self):
        self.user = User.objects.create_user(
            username=self.username,
            email=self.email,
            password=self.password,
            is_active=False
        )
        group = get_object_or_404(Group, name='Пользователь')
        group.user_set.add(self.user)

    def _generate_code(self) -> None:
        """Method to generate code, sending to user by email."""
        alphabet = list(string.ascii_lowercase)
        for i in range(0, 50):
            self._token += random.choice(alphabet)

    def _insert_token_in_table(self) -> None:
        """Method to add token in table."""
        AcceptAuthToken.objects.create(token=self._token, user_id=self.user.id)

    def check_form_on_uniqueness(self) -> list:
        """Method to check email and login on uniqueness."""
        errors = [None, None]
        errors[0] = User.objects.filter(username=self.username).exists()
        errors[1] = User.objects.filter(email=self.email).exists()
        return errors

    def _send_message_with_code(self) -> None:
        """Method to send message with token in email."""
        content = f"Дарова {self.username}.\n" \
                  "Чтобы успешно пройти регистрацию перейди по данной ссылке:\n" \
                  f"Ссылка: http://127.0.0.1:8000/auth/accept/{self._token}\n" \
                  "Смотри не ошибись, братело :).\n" \
                  "Всего хорошего ©Azamat Komaev\n\n"
        send_mail_with_accepting_token.delay(content, [self.email])

    def create_user(self) -> None:
        """Method to create new user."""
        self._generate_code()
        self._send_message_with_code()
        self._create_and_setting_user()
        self._insert_token_in_table()

    @staticmethod
    def accept_password_to_reg(token: str) -> None:
        """
        Static method to accept user by token, sent him by email. If token is valid we make is_active = True and delete token.
        """
        token_from_db = get_object_or_404(AcceptAuthToken, token=token)
        user = get_object_or_404(User, id=token_from_db.user_id)
        user.is_active = True
        user.save()
        token_from_db.delete()


class UserService:
    user: User

    def __init__(self, user_id: int):
        self.user = get_object_or_404(User, id=user_id)

    @staticmethod
    def get_user(user_id: int = None, username: str = None) -> User:
        """Method to get user by one of two params."""
        user = User.objects.filter(Q(username=username) | Q(id=user_id))

        if not user.exists():
            raise Http404({'error': 'Not found'})

        return user.first()

    @staticmethod
    def create(request: Request):
        from .serializers import RegistrationUserSerializer
        serializer = RegistrationUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer

    def get_user_posts(self) -> QuerySet[Post]:
        """Method to get user posts."""
        posts = Post.objects.filter(user_id=self.user.id)
        return posts

    def get_user_friends(self) -> QuerySet[User]:
        """Method to get all user friends."""
        friends = self.user.friends.all()
        return friends

    def get_user_comments(self) -> QuerySet[Comment]:
        """Method to get all user comments."""
        comments = self.user.comment_set.all()
        return comments


class FriendRequestService:
    user: User

    def __init__(self, user: User):
        self.user = user

    def get_common_request(self, first_user: Union[User, int], second_user: Union[User, int]) -> QuerySet[FriendRequest]:
        return FriendRequest.objects.filter(
            Q(to_user=first_user) & Q(from_user=second_user) |
            Q(to_user=second_user) & Q(from_user=first_user)
        )

    @staticmethod
    def _add_both_users_in_each_other_friends_list(friend_request: FriendRequest) -> bool:
        """
        Protected static method for adding both users in friends list of each other.
        """
        from_user, to_user = friend_request.from_user, friend_request.to_user

        from_user.friends.add(to_user)
        to_user.friends.add(from_user)
        return bool(from_user and to_user)

    @staticmethod
    def _remove_both_users_from_each_other_friend_list(friend_request: FriendRequest) -> None:
        """
        Protected static method for removing both users from each other friend lists.
        """
        from_user, to_user = friend_request.from_user, friend_request.to_user

        from_user.friends.remove(to_user)
        to_user.friends.remove(from_user)

    def get_friend_request(self, first_user: User, second_user: User) -> Optional[FriendRequest]:
        """Method to get friend request by two users. If friend requests was not found, it will be return None."""
        friend_request = self.get_common_request(first_user, second_user)
        return friend_request.first()

    def get_current_friend_requests(self) -> QuerySet[FriendRequest]:
        """
        Method to get current friend request, filtering FriendRequest by user_id=user_id and accepted=False.
        """
        chat_requests = FriendRequest.objects.filter(to_user=self.user, is_accepted=False)
        return chat_requests

    def is_friend_request_existing(self, second_user: int) -> bool:
        """Method to check is friend request exists with the user."""
        friend_request = self.get_common_request(self.user, second_user)
        return friend_request.exists()

    def delete_friend_request(self, second_user: User) -> None:
        """Method for deleting friend request."""
        friend_request = self.get_friend_request(self.user, second_user)
        self._remove_both_users_from_each_other_friend_list(friend_request)
        friend_request.delete()

    def accept_friend_request(self, second_user: User, is_accepted: bool) -> Optional[FriendRequest]:
        """Method for accepting friend request making is_accepted True or False."""
        friend_request = self.get_friend_request(self.user, second_user)

        if self.user != friend_request.to_user:
            raise UserIsNotReceiver()

        friend_request.is_accepted = is_accepted
        friend_request.save()
        self._add_both_users_in_each_other_friends_list(friend_request)

        return friend_request
