from django.db import models

class user(models.Model):
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    actions = models.CharField(max_length=100) # Array con las acciones compradas por usuario
    saldo = models.DecimalField(max_digits=10, decimal_places=2) # Campo de tipo decimal
    mail = models.EmailField(unique=True) # Campo de email de acceso
    password = models.CharField(max_length=20)

class action(models.Model):
    name = models.CharField(max_length=48)
    value = models.DecimalField(max_digits=200, decimal_places=2)

class buy(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    action = models.ForeignKey(action, on_delete=models.CASCADE)

class country(models.Model):
    name = models.CharField(max_length=25)

class manager(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    country = models.ForeignKey(country, on_delete=models.CASCADE)

class broker(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    country = models.ForeignKey(country, on_delete=models.CASCADE)

class currency(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(country, on_delete=models.CASCADE)
