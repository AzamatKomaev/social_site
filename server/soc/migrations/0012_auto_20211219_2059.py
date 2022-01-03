# Generated by Django 3.2.8 on 2021-12-19 20:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('soc', '0011_alter_message_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ('-created_at',), 'verbose_name': 'Сообщение', 'verbose_name_plural': 'Сообщения'},
        ),
        migrations.RenameModel(
            old_name='Chat',
            new_name='GroupChat',
        ),
        migrations.CreateModel(
            name='GroupChatRole',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Adm', 'Администратор'), ('Mod', 'Модератор'), ('Mem', 'Участник')], default='Mem', max_length=3)),
                ('data_joined', models.DateTimeField(auto_now_add=True)),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='soc.groupchat')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]