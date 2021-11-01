from django.contrib import admin

from soc.models import Post, Comment, Attachment, Avatar, Category


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Attachment)
admin.site.register(Avatar)
admin.site.register(Category)
