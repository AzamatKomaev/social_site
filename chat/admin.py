from django.contrib import admin

from chat.models import *


admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(PersonalChat)
admin.site.register(PersonalMessage)
