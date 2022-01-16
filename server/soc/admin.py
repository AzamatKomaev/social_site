from django.contrib import admin


from soc.models import User
from soc.models_dir import (
    content,
    friend,
    group_chat,
    personal_chat,
    user
)


admin.site.register(content.Post)
admin.site.register(content.Comment)
admin.site.register(content.Category)
admin.site.register(user.Avatar)
admin.site.register(user.AcceptAuthToken)
admin.site.register(User)
admin.site.register(personal_chat.PersonalChat)
admin.site.register(group_chat.GroupChat)
admin.site.register(group_chat.GroupMessage)
admin.site.register(group_chat.GroupChatRole)
admin.site.register(group_chat.GroupChatRequest)
admin.site.register(personal_chat.PersonalMessage)
admin.site.register(friend.FriendRequest)
