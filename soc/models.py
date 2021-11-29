from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
	email = models.EmailField(unique=True)


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


class Attachment(models.Model):
	"""Таблица для хранения файлов к посту"""
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	photo = models.ImageField(default=" ", upload_to="media/images")
	video = models.FileField(default=" ", upload_to="media/videos")
	file = models.FileField(default=" ", upload_to="media/files")
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Файл"
		verbose_name_plural = "Файлы"

	def __str__(self):
		return f"Attachment for post {self.post}"


class Token(models.Model):
	"""Таблица для хранения токенов регистраций."""
	user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
	token = models.TextField(max_length=30)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = "Токен"
		verbose_name_plural = "Токены"

	def __str__(self):
		return f"Token {self.token}"
