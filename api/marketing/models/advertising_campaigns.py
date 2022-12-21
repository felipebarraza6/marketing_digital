from django.db import models
from api.utils.models import ModelApi

from .job_applications import JobApplitacion
from .branch_officces import BranchOffice
import uuid


class AdvertisingCampaign(ModelApi):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    facebook_id = models.CharField(max_length=3000, blank=True, null=True)
    scope = models.IntegerField(blank=True, null=True, default='0')
    amount = models.IntegerField(blank=True, null=True, default='0')
    result = models.IntegerField(blank=True, null=True, default='0')
    img_chart = models.ImageField(blank=True, null=True)
    message_client = models.TextField(blank=True, null=True)
    message_admin = models.TextField(blank=True, null=True)
    job_applitacion = models.ForeignKey(JobApplitacion, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return str(self.uuid)



