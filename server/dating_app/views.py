from rest_framework import viewsets, permissions

from .models import SiteDatingProfile
from .serializers import SiteDatingProfileSerializer
from .paginators import DatingProfilePagination


class SiteDatingProfileModelViewSet(viewsets.ModelViewSet):
    queryset = SiteDatingProfile.objects.all()
    serializer_class = SiteDatingProfileSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    pagination_class = DatingProfilePagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
