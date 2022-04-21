from django.db import models


def dating_profile_file_path(instance, filename):
    return f'user_{instance.user.id}/dating_profile/{filename}'


class BaseDatingProfile(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )

    name = models.CharField(max_length=255)
    info = models.TextField()
    city = models.CharField(max_length=255)
    sex = models.CharField(choices=SEX_CHOICES, max_length=10)
    age = models.PositiveSmallIntegerField()
    image = models.ImageField(upload_to=dating_profile_file_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class SiteDatingProfile(BaseDatingProfile):
    user = models.ForeignKey('user_app.User', on_delete=models.CASCADE, unique=True)

    class Meta:
        verbose_name = 'Анкета знакомства пользователя сайта'
        verbose_name_plural = 'Анкеты знакомств пользователей сайта'

    def __str__(self):
        return f'{self.user.username}\'s dating profile'


class TelegramDatingProfile(BaseDatingProfile):
    telegram_id = models.IntegerField(unique=True)

    class Meta:
        verbose_name = 'Анкета знакомства пользователя Telegram'
        verbose_name_plural = 'Анкеты знакомств пользователей Telegram.'
