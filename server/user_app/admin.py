from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Avatar)
admin.site.register(AcceptAuthToken)
admin.site.register(FriendRequest)

