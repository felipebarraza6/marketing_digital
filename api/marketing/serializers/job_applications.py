from rest_framework import serializers
from api.marketing.models import JobApplitacion


class JobApplitacionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplitacion
        fields = '__all__'
