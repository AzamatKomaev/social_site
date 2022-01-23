# Generated by Django 3.2.8 on 2022-01-23 10:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_app', '0001_initial'),
        ('group_chat_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupMessage',
            fields=[
                ('basemessage_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='user_app.basemessage')),
                ('chat', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='group_chat_app.groupchat')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Групповое сообщение',
                'verbose_name_plural': 'Групповые сообщения',
                'ordering': ('-created_at',),
            },
            bases=('user_app.basemessage',),
        ),
        migrations.CreateModel(
            name='GroupChatRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Администратор', 'Creator'), ('Модератор', 'Moderator'), ('Участник', 'Member')], default='Участник', max_length=30)),
                ('data_joined', models.DateTimeField(auto_now_add=True)),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='group_chat_app.groupchat')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GroupChatRequest',
            fields=[
                ('baserequest_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='user_app.baserequest')),
                ('from_chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_chat', to='group_chat_app.groupchat')),
            ],
            options={
                'verbose_name': 'Приглашение в чат',
                'verbose_name_plural': 'Приглашения в чат',
                'ordering': ('-created_at',),
            },
            bases=('user_app.baserequest',),
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
