from django.db.models import signals
from django.dispatch import receiver

from soc.models import GroupChatRequest


@receiver(signals.post_save, sender=GroupChatRequest)
def migrate_notify_post(instance, **kwargs):
    print("i was worked")
    print(instance)

