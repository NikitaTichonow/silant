from rest_framework import serializers
from . import models
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from car.models import Car, Maintenance, Complaint
from users.models import ClientProfile

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user_account):
        token = super().get_token(user_account)

        # Добавляем поле username в токен
        token['username'] = user_account.username

        try:
            client_profile = ClientProfile.objects.get(user=user_account)
            cars = Car.objects.filter(client=client_profile)
            token['cars'] = []

            for car in cars:
                car_data = {
                    'id': car.id,
                    'serialNumberCar': car.serialNumberCar,
                    'deliveryAddress': car.deliveryAddress,
                    'supplyContract': car.supplyContract,
                }

                # Сериализуем vehicleModel
                if car.vehicleModel:
                    car_data['vehicleModel'] = {
                        'id': car.vehicleModel.id,
                        'name': car.vehicleModel.name,
                    }
                else:
                    car_data['vehicleModel'] = None

                # Получаем данные о ТО для машины
                maintenances = Maintenance.objects.filter(car=car)
                car_data['maintenances'] = []

                for maintenance in maintenances:
                    maintenance_data = {
                        'typeOfMaintenance': maintenance.typeOfMaintenance.name,
                        'dataOfMaintenance': maintenance.dataOfMaintenance.isoformat() if maintenance.dataOfMaintenance else None,
                        'operatingTime': maintenance.operatingTime,
                        'workOrderNumber': maintenance.workOrderNumber,
                        'workOrderDate': maintenance.workOrderDate.isoformat() if maintenance.workOrderDate else None,
                        'organizationOfMaintenance': maintenance.organizationOfMaintenance.name if maintenance.organizationOfMaintenance else None,
                        'serviceCompany': maintenance.serviceCompany.user.username if maintenance.serviceCompany else None,
                    }
                    car_data['maintenances'].append(maintenance_data)

                # Получаем данные о рекламациях для машины
                complaints = Complaint.objects.filter(car=car)
                car_data['complaints'] = []

                for complaint in complaints:
                    complaint_data = {
                        'dateOfRefusal': complaint.dateOfRefusal.isoformat() if complaint.dateOfRefusal else None,
                        'operatingTime': complaint.operatingTime,
                        'failureNode': complaint.failureNode.name if complaint.failureNode else None,
                        'descriptionOfFailure': complaint.descriptionOfFailure,
                        'recoveryMethod': complaint.recoveryMethod.name if complaint.recoveryMethod else None,
                        'sparePartsUsed': complaint.sparePartsUsed,
                        'restoreDate': complaint.restoreDate.isoformat() if complaint.restoreDate else None,
                    }
                    car_data['complaints'].append(complaint_data)

                token['cars'].append(car_data)
        except ClientProfile.DoesNotExist:
            # Если профиль клиента не найден, устанавливаем пустой список машин
            token['cars'] = []

        return token



class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.UserAccount
    fields = ('id','role')


class UsersProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.UserAccount
    fields = ('id', 'username')


class ClientProfileSerializer(serializers.ModelSerializer):
  user = UsersProfileSerializer()
  class Meta:
    model = models.ClientProfile
    fields = ('id','user')


class ServiceCompanyProfileSerializer(serializers.ModelSerializer):
  user = UsersProfileSerializer()
  class Meta:
    model = models.ServiceCompanyProfile
    fields = ('id','user')
    



