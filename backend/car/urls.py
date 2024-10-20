from django.urls import path
from .views import Vehicle, Engine, Transmission, DriveAxle, SteeringAxle, TypeOfMaintenance, OrganizationOfMaintenance, FailureNode, \
RecoveryMethod, Car, CarFull, CarAdd, Maintenance, MaintenanceAdd, Complaint, ComplaintAdd

urlpatterns = [
    path('datavehicle', Vehicle.as_view()),
    path('dataengine', Engine.as_view()),
    path('datatransmission', Transmission.as_view()),
    path('datadriveaxle', DriveAxle.as_view()),
    path('datasteeringaxle', SteeringAxle.as_view()),
    path('datatypeofmaintenance', TypeOfMaintenance.as_view()),
    path('dataorganizationofmaintenance', OrganizationOfMaintenance.as_view()),
    path('datafailurenode', FailureNode.as_view()),
    path('datarecoverymethod', RecoveryMethod.as_view()),
    path('datacar', Car.as_view()),
    path('datacaradd', CarAdd.as_view()),
    path('datacarfull', CarFull.as_view()),
    path('datamaintenance', Maintenance.as_view()),
    path('datamaintenanceadd', MaintenanceAdd.as_view()),
    path('datacomplaint', Complaint.as_view()),
    path('datacomplaintadd', ComplaintAdd.as_view()),
]