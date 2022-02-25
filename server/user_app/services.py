import random
import string
from typing import Optional

from django.contrib.auth.models import Group
from django.core.mail import send_mail
from django.db.models import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework.request import Request

from content_app.models import Post, Comment
from .models import User, AcceptAuthToken, FriendRequest
try:
    from server.settings import EMAIL_HOST_USER
except ImportError:
    EMAIL_HOST_USER = ""


class CreationUser:
    """Class for creating user, who wants to register."""
    token: str = ""
    user: User
    alphabet = list(string.ascii_lowercase)

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

        self.user.avatar_set.create()
        group = get_object_or_404(Group, name='Пользователь')
        group.user_set.add(self.user)

    def _generate_code(self) -> None:
        """Method to generate code, sending to user by email."""
        for i in range(0, 50):
            self.token += random.choice(self.alphabet)

    def _insert_token_in_table(self) -> None:
        """Method to add token in table."""
        AcceptAuthToken.objects.create(token=self.token, user_id=self.user.id)

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
                  f"Ссылка: http://127.0.0.1:8000/auth/accept/{self.token}\n" \
                  "Смотри не ошибись, братело :).\n" \
                  "Всего хорошего ©Azamat Komaev\n\n" \
                  f"Hello, {self.username}.\n" \
                  "If you wanna pass registration, click on the url down:\n" \
                  f"url: http://127.0.0.1:8000/auth/accept/{self.token}\n" \
                  "Dont make mistake, bro :)\n" \
                  "Good luck ©Azamat Komaev"

        send_mail(
            "Регистрация в InTheGame",
            content,
            EMAIL_HOST_USER,
            [self.email]
        )

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
    def get_user(user_id: int = None, username: str = None) -> Optional[User]:
        """Method to get user by one of two params."""
        user: User

        if username is not None:
            user = get_object_or_404(User, username=username)
        elif user_id is not None:
            user = get_object_or_404(User, id=user_id)
        else:
            return None

        return user

    @staticmethod
    def create(request: Request) -> dict:
        from .serializers import RegistrationUserSerializer
        serializer = RegistrationUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return {'serializer': serializer, 'is_valid': True}

        return {'serializer': serializer, 'is_valid': False}

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

    @staticmethod
    def get_friend_request(first_user: User, second_user: User) -> Optional[FriendRequest]:
        """Method to get friend request by two users. If friend requests was not found, it will be return None."""
        friends_requests = {
            "first": FriendRequest.objects.filter(from_user=first_user, to_user=second_user),
            "second": FriendRequest.objects.filter(from_user=second_user, to_user=first_user)
        }

        if friends_requests['first'].exists():
            return friends_requests['first'].first()
        elif friends_requests['second'].exists():
            return friends_requests['second'].first()

        return None

    def get_current_friend_requests(self) -> QuerySet[FriendRequest]:
        """
        Method to get current friend request, filtering FriendRequest by user_id=user_id and accepted=False.
        """
        chat_requests = FriendRequest.objects.filter(
            to_user=self.user,
            is_accepted=False
        )
        return chat_requests

    def is_friend_request_exists(self, second_user: int) -> bool:
        """Method to check is friend request exists with the user."""
        return bool(
            FriendRequest.objects.filter(to_user=self.user.id, from_user=second_user).exists()
            or
            FriendRequest.objects.filter(to_user=second_user, from_user=self.user.id).exists()
        )

    def create_friend_request(self, to_user_id: int) -> dict:
        """Method to create and send friend request to the user."""
        data = {
            "instance": None,
            "error": None
        }
        user = UserService.get_user(user_id=to_user_id)

        if not user:
            data["error"] = "There is no user with that id."
            return data

        if self.is_friend_request_exists(user.id):
            data["error"] = "Friend request already exists"
            return data

        data["instance"] = FriendRequest.objects.create(
            from_user=self.user,
            to_user_id=user.id,
        )
        return data

    def delete_friend_request(self, second_user: User) -> bool:
        """Method for deleting friend request."""
        if not self.is_friend_request_exists(second_user.id):
            return False

        friend_request = self.get_friend_request(self.user, second_user)

        if self.user not in (friend_request.from_user, friend_request.to_user):
            return False

        self._remove_both_users_from_each_other_friend_list(friend_request)
        return bool(friend_request.delete())

    def accept_friend_request(self, second_user: User, is_accepted: bool) -> Optional[FriendRequest]:
        """Method for accepting friend request making is_accepted True or False."""
        if not self.is_friend_request_exists(second_user):
            return

        friend_request = self.get_friend_request(self.user, second_user)

        if self.user == friend_request.from_user:
            return

        friend_request.is_accepted = is_accepted
        friend_request.save()

        if not self._add_both_users_in_each_other_friends_list(friend_request):
            return

        return friend_request
