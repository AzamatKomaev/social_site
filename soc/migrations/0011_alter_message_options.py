# Generated by Django 3.2.8 on 2021-12-08 19:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soc', '0010_alter_message_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'verbose_name': 'Сообщение', 'verbose_name_plural': 'Сообщения'},
        ),
    ]
