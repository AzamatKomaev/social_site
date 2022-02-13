from django.db.models.signals import pre_save
from django.dispatch import receiver

from ..models import GroupChat


@receiver(pre_save, sender=GroupChat)
def my_handler(sender, **kwargs):
    print("i was worked")
