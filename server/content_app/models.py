from django.db import models

from server.settings import AUTH_USER_MODEL


def post_file_path(instance, filename):
    return f'user_{instance.user.id}/posts/{filename}'


class Category(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(default="", upload_to="category_images")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категорий"

    def __str__(self):
        return self.name


class Post(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    photo = models.ImageField(null=True, blank=True, upload_to=post_file_path)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Пост"
        verbose_name_plural = "Посты"
        ordering = ('-created_at',)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"
        ordering = ('-created_at',)

    def __str__(self):
        return self.text

