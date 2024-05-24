from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    actions = models.CharField(max_length=100, blank=True, null=True) # Array con las acciones compradas por usuario
    saldo = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True) # Campo de tipo decimal
    mail = models.EmailField(unique=True) # Campo de email de acceso
    password = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=25)
    
    def __str__(self):
        return self.name

class Action(models.Model):
    name = models.CharField(max_length=48)
    value = models.DecimalField(max_digits=200, decimal_places=2)
   # country = models.ForeignKey(Country, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Buy(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.ForeignKey(Action, on_delete=models.CASCADE)
   # country = models.ForeignKey(Country, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.name

class Manager(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Broker(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Currency(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
