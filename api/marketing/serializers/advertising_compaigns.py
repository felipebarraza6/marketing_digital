from rest_framework import serializers
from api.marketing.models import AdvertisingCampaign


class AdvertisingCampaignModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertisingCampaign
        fields = '__all__'
