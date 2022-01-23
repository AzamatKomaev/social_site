from django.contrib import admin

from .models import *

admin.site.register(GroupChat)
admin.site.register(GroupChatRole)
admin.site.register(GroupMessage)
admin.site.register(GroupChatRequest)
