from django.db import models
from api.utils.models import ModelApi


class BranchOffice(ModelApi):
    name_branch = models.CharField(max_length=500)
    commercial_business = models.TextField(max_length=1200)
    dni_branch = models.CharField(max_length=15)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)


    def __str__(self):
        return str(self.name_branch)



