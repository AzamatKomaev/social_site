from django.contrib.auth.models import Group
from rest_framework.serializers import (
    ModelSerializer,
    HiddenField,
    SerializerMethodField,
    CurrentUserDefault,
    CharField,
)

from soc.api.services import CreationUser, PersonalChatService
from soc.models import User
from soc.models_dir import (
    user as user_models,
    content as content_models,
    group_chat as group_chat_models,
    personal_chat as personal_chat_models,
    friend as friend_models
)


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
    to_user = SerializerMethodField("get_to_user_data")
    from_user = SerializerMethodField("get_from_user_data")

    class Meta:
        model = friend_models.FriendRequest
        fields = "__all__"

    def get_to_user_data(self, obj: group_chat_models.GroupChatRequest) -> dict:
        return UserSerializer(obj.to_user).data

    def get_from_user_data(self, obj: group_chat_models.GroupChatRequest) -> dict:
        return UserSerializer(obj.from_user).data


class GroupSerializer(ModelSerializer):
    """Сериализатор для групп пользователей сайта."""
    class Meta:
        model = Group
        fields = ['name']


class CategorySerializer(ModelSerializer):
    """Сериализатор для категорий."""
    count = SerializerMethodField('get_count_of_posts')

    class Meta:
        model = content_models.Category
        fields = '__all__'

    def get_count_of_posts(self, obj: content_models.Category) -> int:
        return obj.post_set.all().count()


class PostSerializer(ModelSerializer):
    """Сериализатор для постов."""
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField('get_data_about_user')
    comments = SerializerMethodField('get_comments')

    def get_data_about_user(self, obj: content_models.Post) -> dict:
        return UserSerializer(obj.user).data

    def get_comments(self, obj: content_models.Post) -> list:
        comments = content_models.Comment.objects.filter(post_id=obj.id)
        comments_list = [CommentSerializer(comment).data for comment in comments]
        return comments_list

    class Meta:
        model = content_models.Post
        fields = "__all__"


class CommentSerializer(ModelSerializer):
    """Сериализатор для комментариев."""
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")
    text = CharField()

    def get_user_data(self, obj: content_models.Comment):
        return UserSerializer(obj.user).data

    class Meta:
        model = content_models.Comment
        fields = "__all__"


class AvatarSerializer(ModelSerializer):
    class Meta:
        model = user_models.Avatar
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
        model = group_chat_models.GroupChat
        fields = '__all__'

    def get_last_message(self, obj: group_chat_models.GroupChat) -> dict:
        return GroupMessageSerializer(obj.groupmessage_set.all().first()).data


class GroupMessageSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = group_chat_models.GroupMessage
        fields = "__all__"

    def get_user_data(self, obj: group_chat_models.GroupMessage) -> dict:
        return UserSerializer(obj.user).data


class PersonalMessageSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = personal_chat_models.PersonalMessage
        fields = "__all__"

    def get_user_data(self, obj: personal_chat_models.PersonalMessage) -> dict:
        return UserSerializer(obj.user).data


class PersonalChatSerializer(ModelSerializer):
    user = HiddenField(default=CurrentUserDefault())
    last_message = SerializerMethodField('get_last_message')
    interlocutor = SerializerMethodField('get_interlocutor')
    messages_count = SerializerMethodField('get_messages_count')

    class Meta:
        model = personal_chat_models.PersonalChat
        fields = "__all__"

    def get_last_message(self, obj: personal_chat_models.PersonalChat) -> dict:
        return GroupMessageSerializer(obj.personalmessage_set.all().first()).data

    def get_interlocutor(self, obj: personal_chat_models.PersonalChat) -> dict:
        return UserSerializer(PersonalChatService.get_interlocutor(
            personal_chat=obj,
            user=self.context['request'].user
        )).data

    def get_messages_count(self, obj: personal_chat_models.PersonalChat) -> int:
        return len(obj.personalmessage_set.all())


class GroupChatRoleSerializer(ModelSerializer):
    user_data = SerializerMethodField("get_user_data")

    class Meta:
        model = group_chat_models.GroupChatRole
        fields = "__all__"

    def get_user_data(self, obj: group_chat_models.GroupChatRole):
        return UserSerializer()


class GroupChatMembersSerializer(ModelSerializer):
    user_data = SerializerMethodField('get_user_data')

    def get_user_data(self, obj: group_chat_models.GroupChatRole) -> dict:
        return UserSerializer(obj.user).data

    class Meta:
        model = group_chat_models.GroupChatRole
        fields = ["id",
                  "user_data",
                  "name",
                  "data_joined"
                  ]


class GroupChatRequestSerializer(ModelSerializer):
    to_user = SerializerMethodField('get_to_user_data')
    from_chat = SerializerMethodField('get_from_chat_data')

    class Meta:
        model = group_chat_models.GroupChatRequest
        fields = "__all__"

    def get_to_user_data(self, obj) -> dict:
        return UserSerializer(obj.to_user).data

    def get_from_chat_data(self, obj) -> dict:
        return GroupChatSerializer(obj.from_chat).data

