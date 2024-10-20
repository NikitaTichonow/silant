from django.contrib import admin
from django.contrib.auth.models import Group

from .models import UserAccount , ManagerProfile, ClientProfile, ServiceCompanyProfile 
#  Manager
@admin.register(UserAccount)
class UserAccount(admin.ModelAdmin):
    list_display = ('username', 'password', 'role', 'is_active', 'is_staff', 'is_superuser')
    fields = ['username', 'password', 'role', 'is_active', 'is_staff', 'is_superuser']


admin.site.unregister(Group)


@admin.register(ManagerProfile)
class ManagerProfile(admin.ModelAdmin):
    list_display = ['user']
    fields = ['user']

@admin.register(ClientProfile)
class ClientProfile(admin.ModelAdmin):
    list_display = ['user']
    fields = ['user']

@admin.register(ServiceCompanyProfile)
class ServiceCompanyProfile(admin.ModelAdmin):
    list_display = ['user']
    fields = ['user']



