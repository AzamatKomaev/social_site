from rest_framework import serializers
from .models import SiteDatingProfile


class SiteDatingProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = SiteDatingProfile
        fields = '__all__'
