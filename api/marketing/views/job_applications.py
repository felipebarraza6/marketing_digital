from rest_framework import mixins, viewsets, status
from django_filters import rest_framework as filters
from api.users.models import User
from api.marketing.models import JobApplitacion
from api.marketing.serializers import JobApplitacionModelSerializer 
from rest_framework.permissions import (
        AllowAny,
        IsAuthenticated)



class JobApplicationViewSet(mixins.RetrieveModelMixin,
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
            return JobApplitacionModelSerializer      
        return JobApplitacionModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = JobApplitacion.objects.all()
    lookup_field = 'uuid'


