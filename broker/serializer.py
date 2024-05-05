from rest_framework import serializers
from .models import user, action, buy, country, manager, broker, currency

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id', 'name', 'country', 'actions', 'saldo', 'mail', 'password')

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = action
        fields = '__all__'

class BuySerializer(serializers.ModelSerializer):
    class Meta:
        model = buy
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = country
        fields = '__all__'

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = manager
        fields = '__all__'

class BrokerSerializer(serializers.ModelSerializer):
    class Meta:
        model = broker
        fields = '__all__'

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = currency
        fields = '__all__'