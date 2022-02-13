from django.apps import AppConfig


class GroupChatAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'group_chat_app'

    def ready(self):
        import group_chat_app.signals.handlers
