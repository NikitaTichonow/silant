from django.contrib import admin

from .models import VehicleModel, EngineModel, TransmissionModel, DriveAxleModel, SteeringAxleModel, \
                     TypeOfMaintenance, OrganizationOfMaintenance, FailureNode, RecoveryMethod, Car, \
                     Maintenance, Complaint


@admin.register(VehicleModel)
class VehicleModel(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']


@admin.register(EngineModel)
class EngineModel(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']


@admin.register(TransmissionModel)
class TransmissionModel(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']


@admin.register(DriveAxleModel)
class DriveAxleModel(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']


@admin.register(SteeringAxleModel)
class SteeringAxleModel(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']


@admin.register(TypeOfMaintenance)
class TypeOfMaintenance(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']

@admin.register(OrganizationOfMaintenance)
class OrganizationOfMaintenance(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']

@admin.register(FailureNode)
class FailureNode(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']

@admin.register(RecoveryMethod)
class RecoveryMethod(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = ['name', 'description']


@admin.register(Car)
class Car(admin.ModelAdmin):
    list_display = ('serialNumberCar', 'vehicleModel', 'engineModel', 'serialNumberEngine', 'transmissionModel', 'serialNumberTransmission',
                        'driveAxleModel', 'serialNumberDriveAxle', 'steeringAxleModel', 'serialNumberSteeringAxle', 'supplyContract', 
                        'shippingDate', 'consignee', 'deliveryAddress', 'equipment', 'client', 'serviceCompany')
    fields = ['serialNumberCar', 'vehicleModel', 'engineModel', 'serialNumberEngine', 'transmissionModel', 'serialNumberTransmission',
                        'driveAxleModel', 'serialNumberDriveAxle', 'steeringAxleModel', 'serialNumberSteeringAxle', 'supplyContract', 
                        'shippingDate', 'consignee', 'deliveryAddress', 'equipment', 'client', 'serviceCompany']

@admin.register(Maintenance)
class Maintenance(admin.ModelAdmin):
    list_display = ('typeOfMaintenance', 'dataOfMaintenance', 'operatingTime', 'workOrderNumber', 'workOrderDate', 
                        'organizationOfMaintenance', 'car', 'serviceCompany')
    fields = ['typeOfMaintenance', 'dataOfMaintenance', 'operatingTime', 'workOrderNumber', 'workOrderDate', 
                        'organizationOfMaintenance', 'car', 'serviceCompany']
    
@admin.register(Complaint)
class Complaint(admin.ModelAdmin):
    list_display = ('dateOfRefusal', 'operatingTime', 'failureNode', 'descriptionOfFailure', 'recoveryMethod', 'sparePartsUsed',
                       'restoreDate', 'car')
    fields = ['dateOfRefusal', 'operatingTime', 'failureNode', 'descriptionOfFailure', 'recoveryMethod', 'sparePartsUsed',
                       'restoreDate', 'car']



