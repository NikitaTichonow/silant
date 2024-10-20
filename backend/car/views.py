from rest_framework.generics import ListAPIView, ListCreateAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from . import serializer
from . import models


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class Vehicle(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.VehicleSerializer
    queryset = models.VehicleModel.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class Engine(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.EngineSerializer
    queryset = models.EngineModel.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class Transmission(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.TransmissionSerializer
    queryset = models.TransmissionModel.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class DriveAxle(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.DriveAxleSerializer
    queryset = models.DriveAxleModel.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class SteeringAxle(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.SteeringAxleSerializer
    queryset = models.SteeringAxleModel.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class TypeOfMaintenance(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.TypeOfMaintenanceSerializer
    queryset = models.TypeOfMaintenance.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class OrganizationOfMaintenance(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.OrganizationOfMaintenanceSerializer
    queryset = models.OrganizationOfMaintenance.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class FailureNode(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.FailureNodeSerializer
    queryset = models.FailureNode.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class RecoveryMethod(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.RecoveryMethodSerializer
    queryset = models.RecoveryMethod.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']


class Car(ListAPIView):
    permission_classes = [permissions.IsAuthenticated|ReadOnly]
    serializer_class = serializer.CarSerializer
    queryset = models.Car.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id','serialNumberCar', 'vehicleModel', 'engineModel', 'serialNumberEngine', 'transmissionModel', 'serialNumberTransmission',
                        'driveAxleModel', 'serialNumberDriveAxle', 'steeringAxleModel', 'serialNumberSteeringAxle']

class CarAdd(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializer.CarAddSerializer
    queryset = models.Car.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['serialNumberCar', 'vehicleModel', 'engineModel', 'serialNumberEngine', 'transmissionModel', 'serialNumberTransmission',
                        'driveAxleModel', 'serialNumberDriveAxle', 'steeringAxleModel', 'serialNumberSteeringAxle', 'supplyContract', 
                        'shippingDate', 'consignee', 'deliveryAddress', 'equipment', 'client', 'serviceCompany']
    
  

class CarFull(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializer.CarSerializer
    queryset = models.Car.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['serialNumberCar', 'vehicleModel', 'engineModel', 'serialNumberEngine', 'transmissionModel', 'serialNumberTransmission',
                        'driveAxleModel', 'serialNumberDriveAxle', 'steeringAxleModel', 'serialNumberSteeringAxle', 'supplyContract', 
                        'shippingDate', 'consignee', 'deliveryAddress', 'equipment', 'client', 'serviceCompany']


class Maintenance(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializer.MaintenanceSerializer
    queryset = models.Maintenance.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['typeOfMaintenance', 'dataOfMaintenance', 'operatingTime', 'workOrderNumber', 'workOrderDate', 
                        'organizationOfMaintenance', 'car', 'serviceCompany']

class MaintenanceAdd(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializer.MaintenanceAddSerializer
    queryset = models.Maintenance.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['typeOfMaintenance', 'dataOfMaintenance', 'operatingTime', 'workOrderNumber', 'workOrderDate', 
                        'organizationOfMaintenance', 'car', 'serviceCompany']

class Complaint(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializer.ComplaintSerializer
    queryset = models.Complaint.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['dateOfRefusal', 'operatingTime', 'failureNode', 'descriptionOfFailure', 'recoveryMethod', 'sparePartsUsed',
                       'restoreDate', 'car']
    
class ComplaintAdd(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializer.ComplaintAddSerializer
    queryset = models.Complaint.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['dateOfRefusal', 'operatingTime', 'failureNode', 'descriptionOfFailure', 'recoveryMethod', 'sparePartsUsed',
                       'restoreDate', 'car']