from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
	email = models.EmailField(
		unique=True,
		error_messages={
			'unique': 'Пользователь с такой почтой уже существует.'
		}
	)


class Category(models.Model):
	name = models.CharField(max_length=255)
	avatar = models.ImageField(default="", upload_to="media/category_images")

	class Meta:
		verbose_name = "Категория"
		verbose_name_plural = "Категорий"

	def __str__(self):
		return self.name


class Avatar(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	image = models.ImageField(default="/static/img/me.png", upload_to="media/user_images")
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Аватар"
		verbose_name_plural = "Аватарки"

	def __str__(self):
		return f"Аватарка пользователя {self.user}"


class Post(models.Model):
	"""Таблица для хранения поста"""
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)

	title = models.CharField(max_length=200)
	text = models.TextField()
	photo = models.ImageField(null=True, blank=True, upload_to="media/post_photo")
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Пост"
		verbose_name_plural = "Посты"
		ordering = ('-created_at',)

	def __str__(self):
		return self.title


class Comment(models.Model):
	"""Таблица для хранения комментария к постам"""
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	text = models.TextField(default=None)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Комментарий"
		verbose_name_plural = "Комментарии"
		ordering = ('-created_at',)

	def __str__(self):
		return self.text


class AcceptAuthToken(models.Model):
	"""Таблица для хранения токенов регистраций."""
	user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
	token = models.TextField(max_length=50)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Токен авторизаций."
		verbose_name_plural = "Токены авторизаций."

	def __str__(self):
		return f"Token {self.token}"


class Chat(models.Model):
    name = models.CharField(max_length=50, help_text="Название чата")
    created_at = models.DateTimeField(auto_now_add=True)
    token = models.UUIDField(default=uuid4, editable=False)
    avatar = models.ImageField(default="/static/img/me.png", upload_to="media/group_avatars")
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator_id")
    users = models.ManyToManyField(User, related_name="users_id")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Чат"
        verbose_name_plural = "Чаты"


class Message(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def was_created_minutes_ago(self):
        difference = timezone.now() - self.created_at
        return difference

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"


class PersonalChat(models.Model):
    users = models.ManyToManyField(User)

    def __str__(self):
        return str(self.id)


class PersonalMessage(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(PersonalChat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

