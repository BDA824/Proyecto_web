from rest_framework import serializers
from .models import User, Action, Buy, Country, Manager, Broker, Currency
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'country', 'actions', 'saldo', 'mail', 'password')
        
        def validate_mail(self, value):
        # Verificar si el correo electrónico ya está en uso
            if User.objects.filter(mail=value).exists():
                raise serializers.ValidationError("Este correo electrónico ya está registrado.")
            return value

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'

class BuySerializer(serializers.ModelSerializer):
    class Meta:
        model = Buy
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'

class BrokerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Broker
        fields = '__all__'

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'