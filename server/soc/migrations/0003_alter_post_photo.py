# Generated by Django 3.2.8 on 2021-11-29 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soc', '0002_auto_20211129_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]