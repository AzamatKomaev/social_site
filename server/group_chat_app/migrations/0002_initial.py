# Generated by Django 3.2.8 on 2022-02-23 10:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('group_chat_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupmessage',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchatrole',
            name='chat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='group_chat_app.groupchat'),
        ),
        migrations.AddField(
            model_name='groupchatrole',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchatrequest',
            name='from_chat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_request_from_chat', to='group_chat_app.groupchat'),
        ),
        migrations.AddField(
            model_name='groupchatrequest',
            name='to_user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='group_request_to_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creator_id', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupchat',
            name='users',
            field=models.ManyToManyField(related_name='users_id', to=settings.AUTH_USER_MODEL),
        ),
    ]
