from django.contrib import admin
from api.marketing.models import BranchOffice, JobApplitacion, AdvertisingCampaign 

# Register your models here.


@admin.register(BranchOffice)
class BranchOfficeAdmin(admin.ModelAdmin):
    pass

@admin.register(JobApplitacion)
class JobApplitacionAdmin(admin.ModelAdmin):
    pass

@admin.register(AdvertisingCampaign)
class AdvertisingCampaignAdmin(admin.ModelAdmin):
    pass
