# Generated by Django 3.2.8 on 2022-04-18 07:25

import dating_app.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dating_app', '0002_auto_20220417_2138'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteDatingProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('TG', 'Telegram'), ('Site', 'Site')], max_length=8)),
                ('name', models.CharField(max_length=255)),
                ('info', models.TextField()),
                ('city', models.CharField(max_length=255)),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=10)),
                ('age', models.PositiveSmallIntegerField()),
                ('image', models.ImageField(upload_to=dating_app.models.dating_profile_file_path)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Анкета знакомства пользователя сайта',
                'verbose_name_plural': 'Анкеты знакомств пользователей сайта',
            },
        ),
        migrations.CreateModel(
            name='TelegramDatingProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('TG', 'Telegram'), ('Site', 'Site')], max_length=8)),
                ('name', models.CharField(max_length=255)),
                ('info', models.TextField()),
                ('city', models.CharField(max_length=255)),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=10)),
                ('age', models.PositiveSmallIntegerField()),
                ('image', models.ImageField(upload_to=dating_app.models.dating_profile_file_path)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('telegram_id', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Анкета знакомства пользователя Telegram',
                'verbose_name_plural': 'Анкеты знакомств пользователей Telegram.',
            },
        ),
        migrations.DeleteModel(
            name='DatingProfile',
        ),
    ]
