from django.db import models
from django.contrib.auth.models import AbstractUser

from polymorphic.models import PolymorphicModel


class User(AbstractUser):
	email = models.EmailField(
		unique=True,
		error_messages={
			'unique': 'Пользователь с такой почтой уже существует.'
		}
	)
	friends = models.ManyToManyField("User")


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


class GroupChat(models.Model):
	name = models.CharField(max_length=50, help_text="Название чата")
	created_at = models.DateTimeField(auto_now_add=True)
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
	chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, default=None)
	user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

	def __str__(self):
		return self.text

	class Meta:
		verbose_name = "Сообщение"
		verbose_name_plural = "Сообщения"
		ordering = ('-created_at',)


class GroupChatRole(models.Model):
	CHAT_ROLES = [
		("Администратор", 'Creator'),
		("Модератор", 'Moderator'),
		("Участник", 'Member'),
	]

	name = models.CharField(
		max_length=30,
		choices=CHAT_ROLES,
		default="Участник"
	)
	data_joined = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE)


class PersonalChat(models.Model):
	users = models.ManyToManyField(User)

	def __str__(self):
		return str(self.id)


class PolymorphicMessage(PolymorphicModel):
	text = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)


class GroupMessage(PolymorphicMessage):
	chat = models.ForeignKey(GroupChat, on_delete=models.CASCADE, default=None)

	def __str__(self):
		return self.text

	class Meta:
		verbose_name = "Групповое сообщение"
		verbose_name_plural = "Групповые сообщения"
		ordering = ('-created_at',)


class PersonalMessage(PolymorphicMessage):
	chat = models.ForeignKey(PersonalChat, on_delete=models.CASCADE, default=None)

	def __str__(self):
		return self.text

	class Meta:
		verbose_name = "Личное сообщение"
		verbose_name_plural = "Личные сообщения"
		ordering = ('-created_at',)

