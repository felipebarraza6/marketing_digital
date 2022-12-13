from rest_framework import serializers
from api.marketing.models import BranchOffice


class BranchOfficeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchOffice
        fields = '__all__'
