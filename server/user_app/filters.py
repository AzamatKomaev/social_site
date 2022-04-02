import django_filters

from user_app.models import User


class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = ['id', 'username']

