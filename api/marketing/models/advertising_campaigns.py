from django.db import models
from api.utils.models import ModelApi

from .job_applications import JobApplitacion
from .branch_offices import BranchOffice
import uuid


class AdvertisingCampaign(ModelApi):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    scope = models.IntegerField()
    interactions = models.IntegerField()
    result = models.IntegerField()
    frequency = models.FloatField()
    job_applitacion = models.ForeignKey(JobApplitacion, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)


    def __str__(self):
        return str(self.uuid)



