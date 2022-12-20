from rest_framework import serializers
from api.marketing.models import JobApplitacion, AdvertisingCampaign
from api.users.serializers import UserModelSerializer


class RetrieveJobApplitacionModelSerializer(serializers.ModelSerializer):
    owner_client = UserModelSerializer()
    owner_adm = UserModelSerializer()
    class Meta:
        model = JobApplitacion
        fields = '__all__'

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
        instance.image_grafic = validated_data.get('image_grafic', instance.image_grafic)
        instance.is_confirmgrafic = validated_data.get('is_confirmgrafic', instance.is_confirmgrafic)
        instance.owner_adm = validated_data.get('owner_adm', instance.owner_adm)
        instance.is_answer_grafic = validated_data.get('is_answer_grafic', instance.is_answer_grafic)
        instance.note_client = validated_data.get('note_client', instance.note_client)
        
        if instance.is_confirmgrafic == True:
            AdvertisingCampaign.objects.create(job_applitacion=instance)

        instance.save()
        return instance
