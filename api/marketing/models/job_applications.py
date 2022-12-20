from django.db import models
from api.utils.models import ModelApi
from .branch_officces import BranchOffice

import uuid

class JobApplitacion(ModelApi):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    budget = models.IntegerField()
    title = models.CharField(max_length=500)
    description = models.TextField(max_length=1200)
    start_date = models.DateField()
    end_data = models.DateField()
    owner_client = models.ForeignKey('users.User', related_name='owner_client_user', on_delete=models.CASCADE)
    owner_adm = models.ForeignKey('users.User', related_name='owner_adm_user',on_delete=models.CASCADE, blank=True, null=True)
    report_adm = models.TextField(max_length=1200, null=True, blank=True)
    branch_office = models.ForeignKey(BranchOffice, on_delete=models.CASCADE)
    image_grafic = models.ImageField(blank=True, null=True)
    payment = models.FileField(blank=True, null=True)
    is_confirmgrafic = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_answer = models.BooleanField(default=False)
    is_answer_grafic = models.BooleanField(default=False)
    note_client = models.TextField(max_length=1200, blank=True, null=True)



    def __str__(self):
        return str(self.owner_client)

