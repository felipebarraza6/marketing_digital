from rest_framework import serializers
from api.marketing.models import JobApplitacion, AdvertisingCampaign


class JobApplitacionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplitacion
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.budget = validated_data.get('budget', instance.budget)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_data = validated_data.get('end_data', instance.end_data)
        instance.report_adm = validated_data.get('report_adm', instance.report_adm)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_answer = validated_data.get('is_answer', instance.is_answer)
        
        if instance.is_active == True and instance.is_answer == True:
            AdvertisingCampaign.objects.create(job_applitacion=instance)

        return instance
