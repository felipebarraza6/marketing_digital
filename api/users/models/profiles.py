from django.db import models

from .users import User
from api.utils.models import ModelApi


class ClientProfile(ModelApi):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contract_date = models.DateField()
    name_enterprise = models.CharField(max_length=300)

    def __str__(self):
        return str(self.name_enterprise)
