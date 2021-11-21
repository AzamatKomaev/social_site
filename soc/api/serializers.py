from django.contrib.auth.models import User, Group

from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    IntegerField,
    SerializerMethodField,
    CurrentUserDefault,
)

from soc.models import Post, Category, Comment, Avatar


class UserSerializer(ModelSerializer):
    """Сериализатор для пользователей сайта."""
    group_data = SerializerMethodField('get_group_data')
    avatar = SerializerMethodField('get_avatar')

    def get_group_data(self, obj: User) -> dict:
        return GroupSerializer(obj.groups.get()).data

    def get_avatar(self, obj: User):
        return AvatarSerializer(obj.avatar_set.get()).data

    class Meta:
        model = User
        fields = ["id",
                  "username",
                  "email",
                  "group_data",
                  "avatar"]


class GroupSerializer(ModelSerializer):
    """Сериализатор для групп пользователей сайта."""
    class Meta:
        model = Group
        fields = ['name']


class CategorySerializer(ModelSerializer):
    """Сериализатор для категорий."""
    count = SerializerMethodField('get_count_of_posts')

    class Meta:
        model = Category
        fields = '__all__'

    def get_count_of_posts(self, obj) -> int:
        return obj.post_set.all().count()


class PostSerializer(ModelSerializer):
    """Сериализатор для постов."""
    user = HiddenField(default=CurrentUserDefault())
    category_id = IntegerField()
    user_data = SerializerMethodField('get_data_about_user')
    attachment = SerializerMethodField('get_attachment')
    comments = SerializerMethodField('get_comments')

    def get_data_about_user(self, obj: Post) -> dict:
        return UserSerializer(obj.user).data

    def get_attachment(self, obj: Post) -> list:
        images = [image.photo.url for image in obj.attachment_set.all()]
        return images

    def get_comments(self, obj: Post) -> list:
        comments = Comment.objects.filter(post_id=obj.id)
        comments_list = [CommentSerializer(comment).data for comment in comments]
        return comments_list

    class Meta:
        model = Post
        fields = "__all__"



class CommentSerializer(ModelSerializer):
    """Сериализатор для комментариев."""
    user_data = SerializerMethodField("get_user_data")

    def get_user_data(self, obj: Comment):
        return UserSerializer(obj.user).data

    class Meta:
        model = Comment
        fields = "__all__"


class AvatarSerializer(ModelSerializer):
    class Meta:
        model = Avatar
        fields = ["image"]
