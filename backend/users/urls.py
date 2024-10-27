from django.urls import path
from .views import UserProfile, UsersProfile, ClientProfile, ServiceCompanyProfile, CustomTokenObtainPairView

urlpatterns = [
    path('me', UserProfile.as_view()),
    path('client/', ClientProfile.as_view()),
    path('users/', UsersProfile.as_view()),
    path('servicecompany/',ServiceCompanyProfile.as_view()),
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]