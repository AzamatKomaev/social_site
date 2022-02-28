from django.db import models

from server.settings import AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(default="", upload_to="media/category_images")

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
    photo = models.ImageField(null=True, blank=True, upload_to="media/post_photo")
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


class Group(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    avatar = models.FileField(upload_to="media/group_avatars")
    interests = models.ManyToManyField('Interest')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"

    def __str__(self):
        return f"Group {self.name}"


class Interest(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
