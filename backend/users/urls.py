from django.urls import path
from .views import UserProfile, UsersProfile, ClientProfile, ServiceCompanyProfile

urlpatterns = [
    path('me', UserProfile.as_view()),
    path('client/', ClientProfile.as_view()),
    path('users/', UsersProfile.as_view()),
    path('servicecompany/',ServiceCompanyProfile.as_view()),
]