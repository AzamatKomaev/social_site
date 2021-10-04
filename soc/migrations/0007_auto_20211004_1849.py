# Generated by Django 3.2.7 on 2021-10-04 15:49

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('soc', '0006_usermoredata'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserMoreData',
            new_name='Avatar',
        ),
        migrations.AlterModelOptions(
            name='avatar',
            options={'verbose_name': 'Аватар', 'verbose_name_plural': 'Аватарки'},
        ),
    ]
