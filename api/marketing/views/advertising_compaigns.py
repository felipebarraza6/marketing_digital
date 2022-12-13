from rest_framework import mixins, viewsets, status
from django_filters import rest_framework as filters
from api.marketing.models import AdvertisingCampaign
from api.marketing.serializers import AdvertisingCampaignModelSerializer 
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated)



class AdvertisingCampaignViewSet(mixins.RetrieveModelMixin,
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
            return AdvertisingCampaignModelSerializer      
        return AdvertisingCampaignModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = AdvertisingCampaign.objects.all()
    lookup_field = 'uuid'
