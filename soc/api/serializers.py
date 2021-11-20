from django.contrib.auth.models import User, Group

from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    IntegerField,
    SerializerMethodField,
    CurrentUserDefault,
)

from soc.models import Post, Category, Comment


class UserSerializer(ModelSerializer):
    """Сериализатор для пользователей сайта."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class GroupSerializer(ModelSerializer):
    """Сериализатор для групп пользователей сайта."""
    class Meta:
        model = Group
        fields = ['id', 'name']


class CategorySerializer(ModelSerializer):
    """Сериализатор для категорий."""
    count = SerializerMethodField('get_count_of_posts')

    class Meta:
        model = Category
        fields = '__all__'

    def get_count_of_posts(self, obj):
        return obj.post_set.all().count()


class PostSerializer(ModelSerializer):
    """Сериализатор для постов."""
    user = HiddenField(default=CurrentUserDefault())
    category_id = IntegerField()
    user_data = SerializerMethodField('get_data_about_user')
    attachment = SerializerMethodField('get_attachment')

    class Meta:
        model = Post
        fields = "__all__"

    def get_data_about_user(self, obj: Post) -> dict:
        return {
            "id": obj.user.id,
            "username": obj.user.username,
            "avatar": obj.user.avatar_set.all().first().image.url,
            "group": obj.user.groups.get().name
        }

    def get_attachment(self, obj: Post) -> list:
        images = [image.photo.url for image in obj.attachment_set.all()]
        return images


class CommentSerializer(ModelSerializer):
    """Сериализатор для комментариев."""
    user = HiddenField(default=CurrentUserDefault())
    post_id = IntegerField()

    class Meta:
        model = Comment
        fields = ['id', 'text', 'created_at', 'post_id', 'user']
