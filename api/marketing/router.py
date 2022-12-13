
# Django
from django.urls import include,path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from api.marketing.views import advertising_compaigns, branch_officces, job_applications 
router = DefaultRouter()

#Actions
router.register(r'branch_officces', branch_officces.BranchOfficeViewSet, basename='branch_officces')
router.register(r'job_applications', job_applications.JobApplicationViewSet, basename='job_applications')
router.register(r'advertising_campaigns', advertising_compaigns.AdvertisingCampaignViewSet, basename='advertising_campaigns')

urlpatterns = [
    path('', include(router.urls))
]
