# Generated by Django 3.2.7 on 2021-10-17 10:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soc_api', '0003_tokenwasused'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tokenwasused',
            name='updated_at',
        ),
    ]