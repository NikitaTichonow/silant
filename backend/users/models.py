from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
from django.db.models.signals import post_save
from django.contrib.auth.hashers import make_password
from django.dispatch import receiver

class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        MANAGER = "MANAGER", "Manager"
        CLIENT = "CLIENT", "Client"
        SERVICECOMPANY = "SERVICECOMPANY", "ServiceCompany"

class UserAccountManager(BaseUserManager):
    def create_user(self, username, password=None, role=None):
        """
        Creates and saves a User with the given first_name and password.
        """
        if not username:
            raise ValueError('Users must provide a first_name to create an account')
        
        user = self.model(
            username=username,
            role=role,
        )
        
        password=password
        user.set_password(password)
        print(password)
        
        user.save(using=self._db)

        return user   

    def create_superuser(self, username, password=None, role=None):
        """
        Creates and saves a superuser with the given username and password.
        """
        user = self.create_user(
            username,
            password=password,
            role='ADMIN',
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user  
 


class UserAccount(AbstractUser):
    
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=50, choices=Role.choices)

             
    objects = UserAccountManager()  

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [] 

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

# Менеджер
class ManagerManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=Role.MANAGER)


class Manager(UserAccount):

    base_role = Role.MANAGER

    Manager = ManagerManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for manager"


class ManagerProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Менеджер'
        verbose_name_plural = 'группа Менеджеры'


# Клиент
class ClientManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        print(results)
        return results.filter(role=Role.CLIENT)


class Client(UserAccount):

    base_role = Role.CLIENT

    Client = ClientManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for client"


class ClientProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'группа Клиенты'


#Сервисная компания
class ServiceCompanyManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=Role.SERVICECOMPANY)


class ServiceCompany(UserAccount):

    base_role = Role.SERVICECOMPANY

    ServiceCompany = ServiceCompanyManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Only for servicecompany"


class ServiceCompanyProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'группа Сервисные компании'

    
@receiver(post_save, sender=UserAccount)
def create_user_profile(sender, instance, created, **kwargs):
    if created and instance.role == "MANAGER":
        print('add Manager')
        ManagerProfile.objects.create(user=instance)
    elif created and instance.role == "CLIENT":
        print('add Client')
        ClientProfile.objects.create(user=instance)
    elif created and instance.role == "SERVICECOMPANY":
        print('add ServiceCompany')
        ServiceCompanyProfile.objects.create(user=instance)
    else: print('no role')