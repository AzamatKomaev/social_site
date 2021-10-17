from django.db import models
from django.contrib.auth.models import User


class Avatar(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	image = models.ImageField(db_column="Аватарка", default="/static/img/me.png", upload_to="media/user_images")

	class Meta:
		verbose_name = "Аватар"
		verbose_name_plural = "Аватарки"


class Post(models.Model):
	"""Таблица для хранения поста"""
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField(max_length=200, db_column="Заголовок")
	text = models.TextField(db_column="Статья")
	created_at = models.DateTimeField(db_column="Дата создания", auto_now=True)

	class Meta:
		verbose_name = "Пост"
		verbose_name_plural = "Посты"

	def __str__(self):
		return self.title


class Comment(models.Model):
	"""Таблица для хранения комментария к постам"""
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	text = models.TextField(db_column="Текст", default=None)
	created_at = models.DateTimeField(db_column="Дата создания", auto_now=True)

	class Meta:
		verbose_name = "Комментарий"
		verbose_name_plural = "Комментарии"

	def __str__(self):
		return self.text

	
class Attachment(models.Model):
	"""Таблица для хранения файлов к посту"""
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	photo = models.ImageField(db_column="Изображение", default=" ", upload_to="media/images")
	video = models.FileField(db_column="Видео", default=" ", upload_to="media/videos")
	file = models.FileField(db_column="Файл", default=" ", upload_to="media/files")

	class Meta:
		verbose_name = "Файл"
		verbose_name_plural = "Файлы"


class Token(models.Model):
	"""Таблица для хранения токенов регистраций."""
	user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
	token = models.TextField(db_column="Токен", max_length=30)
	created_at = models.DateTimeField(db_column="Дата создания", auto_now=True)

	class Meta:
		verbose_name = "Токен"
		verbose_name_plural = "Токены"