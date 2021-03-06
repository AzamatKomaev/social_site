# Generated by Django 3.2.8 on 2022-02-23 10:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GroupChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Название чата', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('avatar', models.ImageField(default='/static/img/me.png', upload_to='media/group_avatars')),
            ],
            options={
                'verbose_name': 'Чат',
                'verbose_name_plural': 'Чаты',
            },
        ),
        migrations.CreateModel(
            name='GroupChatRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_accepted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('changed_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Приглашение в чат',
                'verbose_name_plural': 'Приглашения в чат',
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='GroupChatRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Администратор', 'Creator'), ('Модератор', 'Moderator'), ('Участник', 'Member')], default='Участник', max_length=30)),
                ('data_joined', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='GroupMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('chat', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='group_chat_app.groupchat')),
            ],
            options={
                'verbose_name': 'Групповое сообщение',
                'verbose_name_plural': 'Групповые сообщения',
                'ordering': ('-created_at',),
            },
        ),
    ]
