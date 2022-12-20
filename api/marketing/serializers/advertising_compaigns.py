from rest_framework import serializers
from api.marketing.models import AdvertisingCampaign
from api.marketing.serializers import RetrieveJobApplitacionModelSerializer

class AdvertisingCampaignModelSerializer(serializers.ModelSerializer):
    job_applitacion=RetrieveJobApplitacionModelSerializer()
    class Meta:
        model = AdvertisingCampaign
        fields = '__all__'
        
class ListAdvertisingCampaignModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertisingCampaign
        fields = '__all__'
