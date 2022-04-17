from django.db import models


def dating_profile_file_path(instance, filename):
    return f'user_{instance.user.id}/dating_profile/{filename}'


class DatingProfile(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )
    TYPE_CHOICES = (
        ('TG', 'Telegram'),
        ('Site', 'Site'),
    )

    user = models.ForeignKey('user_app.User', on_delete=models.SET_NULL, null=True, blank=True)
    telegram_id = models.IntegerField(null=True, blank=True)
    type = models.CharField(max_length=8, choices=TYPE_CHOICES)
    name = models.CharField(max_length=255)
    info = models.TextField()
    city = models.CharField(max_length=255)
    sex = models.CharField(choices=SEX_CHOICES, max_length=10)
    age = models.PositiveSmallIntegerField()
    image = models.ImageField(upload_to=dating_profile_file_path)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Анкета знакомства'
        verbose_name_plural = 'Анкеты знакомств'

    def __str__(self):
        return f'{self.user.username}\'s dating profile'


