from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from server.settings import AUTH_USER_MODEL


def user_profile_file_path(instance, filename):
    return f'user_{instance.id}/avatars/{filename}'


class TokenManager(models.Manager):
    def create(self, **kwargs):
        kwargs['expired_at'] = timezone.now() + timezone.timedelta(days=1)
        return super().create(**kwargs)


class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        error_messages={
            'unique': 'Пользователь с такой почтой уже существует.'
        }
    )
    friends = models.ManyToManyField(AUTH_USER_MODEL, blank=True)
    avatar = models.ImageField(upload_to=user_profile_file_path, null=True, blank=True)
    photos = models.ManyToManyField('Photo')


class Photo(models.Model):
    image = models.ImageField(upload_to='user_photos')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Фотография пользователя"
        verbose_name_plural = "Фотографий пользователей"


class AcceptAuthToken(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, on_delete=models.CASCADE, unique=True)
    token = models.TextField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()
    objects = TokenManager()

    class Meta:
        verbose_name = "Токен авторизаций."
        verbose_name_plural = "Токены авторизаций."

    def __str__(self):
        return f"Token {self.token}"


class FriendRequest(models.Model):
    to_user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="friend_request_to_user",
        default=None
    )
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    changed_at = models.DateTimeField(auto_now=True)
    from_user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="friend_request_from_user")

    class Meta:
        verbose_name = "Заявка в друзья"
        verbose_name_plural = "Заявки в друзья"
        ordering = ("-created_at",)

    def __str__(self):
        return f"From {self.from_user} to {self.to_user}"
