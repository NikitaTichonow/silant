from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from . import serializer
from . import models


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class UserProfile(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.UserProfileSerializer
    queryset = models.UserAccount.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [ 'username']


class UsersProfile(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.UsersProfileSerializer
    queryset = models.UserAccount.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'username']



class ClientProfile(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.ClientProfileSerializer
    queryset = models.ClientProfile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']


class ServiceCompanyProfile(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.ServiceCompanyProfileSerializer
    queryset = models.ServiceCompanyProfile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']