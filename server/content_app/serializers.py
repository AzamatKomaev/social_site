from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    SerializerMethodField,
    CurrentUserDefault,
    CharField,
    IntegerField
)

from .models import Post, Comment, Category
from user_app.serializers import UserSerializer


class CategorySerializer(ModelSerializer):
    count = SerializerMethodField('get_count_of_posts')

    class Meta:
        model = Category
        fields = '__all__'

    def get_count_of_posts(self, obj: Category) -> int:
        return obj.post_set.all().count()


class PostSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField('get_data_about_user')
    #comments = SerializerMethodField('get_comments')
    comments_count = SerializerMethodField('get_comments_count')

    def get_data_about_user(self, obj: Post) -> dict:
        return UserSerializer(obj.user).data

    def get_comments(self, obj: Post) -> list:
        comments = Comment.objects.filter(post_id=obj.id)
        comments_list = [CommentSerializer(comment).data for comment in comments]
        return comments_list

    def get_comments_count(self, obj: Post) -> int:
        return obj.comment_set.count()

    class Meta:
        model = Post
        fields = "__all__"


class CommentSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")
    text = CharField()

    def get_user_data(self, obj: Comment):
        return UserSerializer(obj.user).data

    class Meta:
        model = Comment
        fields = "__all__"


