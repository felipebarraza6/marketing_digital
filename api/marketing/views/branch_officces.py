
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import mixins, viewsets, status
from django_filters import rest_framework as filters
from api.users.models import User
from api.marketing.models import BranchOffice
from api.marketing.serializers import BranchOfficeModelSerializer
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated)



class BranchOfficeViewSet(mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet,):

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    
    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'list':
            return BranchOfficeModelSerializer       
        return BranchOfficeModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = BranchOffice.objects.all()
    lookup_field = 'id'


