from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import DatingProfile
from .serializers import DatingProfileSerializer
from .services import is_serializer_valid


class DatingProfileModelViewSet(viewsets.ModelViewSet):
    queryset = DatingProfile.objects.all()
    serializer_class = DatingProfileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_serializer_valid(serializer.data)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
