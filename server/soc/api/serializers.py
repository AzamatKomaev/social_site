from django.contrib.auth.models import Group
from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    SerializerMethodField,
    CurrentUserDefault,
    CharField,
)

from soc.api.services import CreationUser, PersonalChatService
from soc.models import (
    Post,
    Category,
    Comment,
    Avatar,
    GroupChat,
    PersonalMessage,
    PersonalChat,
    GroupChatRole,
    FriendRequest,
    ChatRequest
)
from soc.models import User, GroupMessage, ChatRequest


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
                  "avatar",
                  "friends"]


class FriendRequestSerializer(ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = "__all__"


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
    user_data = SerializerMethodField('get_data_about_user')
    comments = SerializerMethodField('get_comments')

    def get_data_about_user(self, obj: Post) -> dict:
        return UserSerializer(obj.user).data

    def get_comments(self, obj: Post) -> list:
        comments = Comment.objects.filter(post_id=obj.id)
        comments_list = [CommentSerializer(comment).data for comment in comments]
        return comments_list

    class Meta:
        model = Post
        fields = "__all__"


class CommentSerializer(ModelSerializer):
    """Сериализатор для комментариев."""
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")
    text = CharField()

    def get_user_data(self, obj: Comment):
        return UserSerializer(obj.user).data

    class Meta:
        model = Comment
        fields = "__all__"


class AvatarSerializer(ModelSerializer):
    class Meta:
        model = Avatar
        fields = ["image"]


class RegistrationUserSerializer(ModelSerializer):
    password = CharField(min_length=8, max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password"]

    def create(self, validated_data) -> User:
        creation_user = CreationUser(validated_data)
        creation_user.create_user()
        return creation_user.user


class GroupChatSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    last_message = SerializerMethodField('get_last_message')

    class Meta:
        model = GroupChat
        fields = '__all__'

    def get_last_message(self, obj: GroupChat) -> dict:
        return GroupMessageSerializer(obj.groupmessage_set.all().first()).data


class GroupMessageSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = GroupMessage
        fields = "__all__"

    def get_user_data(self, obj: GroupMessage) -> dict:
        return UserSerializer(obj.user).data


class PersonalMessageSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = PersonalMessage
        fields = "__all__"

    def get_user_data(self, obj: PersonalMessage) -> dict:
        return UserSerializer(obj.user).data


class PersonalChatSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    last_message = SerializerMethodField('get_last_message')
    interlocutor = SerializerMethodField('get_interlocutor')
    messages_count = SerializerMethodField('get_messages_count')

    class Meta:
        model = PersonalChat
        fields = "__all__"

    def get_last_message(self, obj: PersonalChat) -> dict:
        return GroupMessageSerializer(obj.personalmessage_set.all().first()).data

    def get_interlocutor(self, obj: PersonalChat) -> dict:
        return UserSerializer(PersonalChatService.get_interlocutor(
            personal_chat=obj,
            user=self.context['request'].user
        )).data

    def get_messages_count(self, obj: PersonalChat) -> int:
        return len(obj.personalmessage_set.all())


class GroupChatRoleSerializer(ModelSerializer):
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = GroupChatRole
        fields = "__all__"

    def get_user_data(self, obj: GroupChatRole):
        return UserSerializer()


class GroupChatMembersSerializer(ModelSerializer):
    user_data = SerializerMethodField('get_user_data')

    def get_user_data(self, obj: GroupChatRole) -> dict:
        return UserSerializer(obj.user).data

    class Meta:
        model = GroupChatRole
        fields = ["id",
                  "user_data",
                  "name",
                  "data_joined"
                  ]


class ChatRequestSerializer(ModelSerializer):
    class Meta:
        model = ChatRequest
        fields = "__all__"
