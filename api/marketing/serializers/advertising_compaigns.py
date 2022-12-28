from rest_framework import serializers
from api.marketing.models import JobApplitacion, AdvertisingCampaign
from api.users.models import User
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

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name_enterprise', )

class JobApplitacionModelSerializer(serializers.ModelSerializer):
    owner_client = UserModelSerializer()
    class Meta:
        model = JobApplitacion
        fields = ('title', 'start_date', 'end_data', 'owner_client', 'budget','image_grafic', 'payment', )

class ReportSerializer(serializers.ModelSerializer):
    job_applitacion = JobApplitacionModelSerializer()
    class Meta:
        model = AdvertisingCampaign
        fields = ('uuid', 'job_applitacion','scope', 'amount', 'result', 'img_chart', 'is_active') 
