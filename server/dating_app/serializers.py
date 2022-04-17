from rest_framework.serializers import ModelSerializer
from .models import DatingProfile


class DatingProfileSerializer(ModelSerializer):
    class Meta:
        model = DatingProfile
        fields = '__all__'
