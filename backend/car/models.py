from django.db import models
from users.models import ClientProfile, ServiceCompanyProfile
# from rest_framework.response import Response

# Справочники
class VehicleManager(models.Manager):
    '''Модель техники(менеджер)'''
    def create_vehicle(self, name, description=None):
        if not name:
            raise ValueError('Vehicle no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model
    
    
class VehicleModel(models.Model):
    '''Модель техники'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)
    
    objects = VehicleManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'


class EngineManager(models.Manager):
    '''Модель двигателя(менеджер)'''
    def create_enginemodel(self, name, description=None):
        if not name:
            raise ValueError('EngineModel no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model

class EngineModel(models.Model):
    '''Модель двигателя'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = EngineManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'


class TransmissionManager(models.Manager):
    '''Модель трансмиссии(менеджер)'''
    def create_transmission(self, name, description=None):
        if not name:
            raise ValueError('Transmission no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model
    
class TransmissionModel(models.Model):
    '''Модель трансмиссии'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)
    
    objects = TransmissionManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссий'


class DriveAxleManager(models.Manager):
    '''Модель ведущего моста(менеджер)'''
    def create_driveaxle(self, name, description=None):
        if not name:
            raise ValueError('DriveAxle no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model


class DriveAxleModel(models.Model):
    '''Модель ведущего моста'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = DriveAxleManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'


class SteeringAxleManager(models.Manager):
    '''Модель управляемого моста(менеджер)'''
    def create_steeringaxle(self, name, description=None):
        if not name:
            raise ValueError('SteeringAxle no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model
    

class SteeringAxleModel(models.Model):
    '''Модель управляемого моста'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = SteeringAxleManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'


class TypeOfMaintenanceManager(models.Manager):
    '''Вид ТО(менеджер)'''
    def create_typeofmaintenance(self, name, description=None):
        if not name:
            raise ValueError('TypeOfMaintenance no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model
    

class TypeOfMaintenance(models.Model):
    '''Вид ТО'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = TypeOfMaintenanceManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'


class OrganizationOfMaintenanceManager(models.Manager):
    '''Организация, проводившая ТО(менеджер)'''
    def create_organizationofmaintenance(self, name, description=None):
        if not name:
            raise ValueError('OrganizationOfMaintenance no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model


class OrganizationOfMaintenance(models.Model):
    '''Организация, проводившая ТО'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = OrganizationOfMaintenanceManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Организация, проводившая ТО'
        verbose_name_plural = 'Организации, проводившие ТО'


class FailureNodeManager(models.Manager):
    '''Узел отказа(менеджер)'''
    def create_failurenode(self, name, description=None):
        if not name:
            raise ValueError('FailureNode no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model


class FailureNode(models.Model):
    '''Узел отказа'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = FailureNodeManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Узлы отказа'


class RecoveryMethodManager(models.Manager):
    '''Способ востановления(менеджер)'''
    def create_recoverymethod(self, name, description=None):
        if not name:
            raise ValueError('RecoveryMethod no name')
        model = self.model(
            name=name,
            description=description,
        )
        print(name + ' --> OK')
        model.save(using=self._db)

        return model
    

class RecoveryMethod(models.Model):
    '''Способ востановления'''
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    description = models.CharField(max_length=200, verbose_name='Описание', null=True, blank=True)

    objects = RecoveryMethodManager()

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Способ востановления'
        verbose_name_plural = 'Способы востановления'


# Ключевая сущность — «машина»
class Car(models.Model):
    '''Машина'''
    serialNumberCar = models.CharField(max_length=10, unique=True, verbose_name='Зав. № машины')
    vehicleModel = models.ForeignKey(VehicleModel, on_delete=models.CASCADE, verbose_name='Модель техники')
    engineModel = models.ForeignKey(EngineModel, on_delete=models.CASCADE, verbose_name='Модель двигателя')
    serialNumberEngine = models.CharField(max_length=10, verbose_name='Зав № двигателя')
    transmissionModel = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE, verbose_name='Модель трансмиссии')
    serialNumberTransmission = models.CharField(max_length=10, verbose_name='Зав. № трансмиссии')
    driveAxleModel = models.ForeignKey(DriveAxleModel, on_delete=models.CASCADE, verbose_name='Модель ведущего моста')
    serialNumberDriveAxle = models.CharField(max_length=10, verbose_name='Зав № ведущего моста')
    steeringAxleModel = models.ForeignKey(SteeringAxleModel, on_delete=models.CASCADE, verbose_name='Модель управляемого моста')
    serialNumberSteeringAxle = models.CharField(max_length=10, verbose_name='Зав № управляемого моста')
    supplyContract = models.CharField(max_length=20, verbose_name='Договор поставки №, дата')
    shippingDate = models.DateField(verbose_name='Дата отгрузки с завода', null=False, blank=False)
    consignee = models.CharField(max_length=300, verbose_name='Грузополучатель (конечный потребитель)')
    deliveryAddress = models.CharField(max_length=300, verbose_name='Адрес поставки (эксплуатации)') 
    equipment = models.CharField(max_length=20, verbose_name='Комплектация (доп. опции)')
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE, verbose_name='Клиент')
    serviceCompany = models.ForeignKey(ServiceCompanyProfile, on_delete=models.CASCADE, verbose_name='Сервисная компания')

    def __str__(self):
        return f'{self.serialNumberCar}'
    
  
    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'

# Сущность «ТО» (техническое обслуживание)
class Maintenance(models.Model):
    '''ТО'''
    typeOfMaintenance = models.ForeignKey(TypeOfMaintenance, on_delete=models.CASCADE, verbose_name='Вид ТО')
    dataOfMaintenance = models.DateField(verbose_name='Дата проведения ТО', null=False, blank=False)
    operatingTime = models.CharField(max_length=20, verbose_name='Наработка, м/час')
    workOrderNumber = models.CharField(max_length=20, verbose_name='№ заказ-наряда')
    workOrderDate = models.DateField(verbose_name='Дата заказ-наряда', null=False, blank=False)
    organizationOfMaintenance = models.ForeignKey(OrganizationOfMaintenance, on_delete=models.CASCADE, verbose_name='Организация, проводившая ТО')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')
    serviceCompany = models.ForeignKey(ServiceCompanyProfile, on_delete=models.CASCADE, verbose_name='Сервисная компания')

    def __str__(self):
        return f'{self.typeOfMaintenance}'
    
    class Meta:
        verbose_name = 'ТО'
        verbose_name_plural = 'ТО'
        ordering = ['-dataOfMaintenance'] 


# Сущность «Рекламации»
class Complaint(models.Model):
    '''Рекламации'''
    dateOfRefusal = models.DateField(verbose_name='Дата отказа', null=False, blank=False)
    operatingTime = models.CharField(max_length=20, verbose_name='Наработка, м/час')
    failureNode = models.ForeignKey(FailureNode, on_delete=models.CASCADE, verbose_name='Узел отказа')
    descriptionOfFailure = models.TextField(verbose_name='Описание отказа')
    recoveryMethod = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE, verbose_name='Способ восстановления')
    sparePartsUsed = models.TextField(verbose_name='Используемые запасные части')
    restoreDate = models.DateField(verbose_name='Дата восстановления', null=False, blank=False)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')

    def equipmentDowntime(self):
        return (self.restoreDate - self.dateOfRefusal).days
    
    def __str__(self):
        return self.descriptionOfFailure

    class Meta:
        verbose_name = 'Рекламации'
        verbose_name_plural = 'Рекламации'
        ordering = ['-dateOfRefusal']


                                     
