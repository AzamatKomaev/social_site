from django.contrib import admin

from soc.models import *


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Avatar)
admin.site.register(Category)
admin.site.register(AcceptAuthToken)
admin.site.register(User)
admin.site.register(GroupChat)
admin.site.register(PersonalChat)
admin.site.register(GroupMessage)
admin.site.register(PersonalMessage)
admin.site.register(GroupChatRole)
admin.site.register(FriendRequest)
