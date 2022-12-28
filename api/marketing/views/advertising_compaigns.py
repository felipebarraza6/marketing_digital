from rest_framework import mixins, viewsets, status
from django_filters import rest_framework as filters
from api.marketing.models import AdvertisingCampaign
from api.marketing.serializers import ReportSerializer,AdvertisingCampaignModelSerializer, ListAdvertisingCampaignModelSerializer 
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer
from rest_framework.pagination import PageNumberPagination
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
    class AdvertisingCampaignFilter(filters.FilterSet):
        class Meta:
            model = AdvertisingCampaign
            fields = {
                'job_applitacion': ['exact'],
                'job_applitacion__owner_client': ['exact']
                }

    filterset_class = AdvertisingCampaignFilter
    queryset = AdvertisingCampaign.objects.all()
    lookup_field = 'uuid'


class OverridePagination(PageNumberPagination):       
               page_size = 10000


class AdvertisingCampaignXLS(XLSXFileMixin, ReadOnlyModelViewSet):
    queryset = AdvertisingCampaign.objects.all()
    serializer_class = ReportSerializer 
    renderer_classes = (XLSXRenderer,)
    filename = 'reporte.xlsx'
    filter_backends = (filters.DjangoFilterBackend,)    
    pagination_class = OverridePagination

    class AdvertisingCampaignFilter(filters.FilterSet):
        class Meta:
            model = AdvertisingCampaign
            fields = {
                'created': ['contains', 'gte', 'lte', 'year', 'month', 'day', 'year__range', 'month__range', 'day__range', 'date__range'],                
            }

    filterset_class = AdvertisingCampaignFilter 

    #xlsx_ignore_headers = ['modified', 'id', 'date_time_medition', 'profile_client']
    column_header = {
        'titles': [
            "UUID",
            "TITULO",
            "FECHA INICIO",
            "FECHA TERMINO",
            "CLIENTE",
            "PRESUPUESTO",
            "GRAFICA",
            "COMPROBANTE DE PAGO",
            "ALCANCE",
            "COSTO",
            "IMPORTE",
            "REPORTE",
            "ESTADO",
        ]
    }
