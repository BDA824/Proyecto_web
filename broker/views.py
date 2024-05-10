from rest_framework import viewsets
from .serializer import UserSerializer, ActionSerializer, BuySerializer, CountrySerializer, ManagerSerializer, BrokerSerializer, CurrencySerializer
from .models import User, Action, Buy, Country, Manager, Broker, Currency

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()  # Esta línea debe estar dentro de la clase

class ActionView(viewsets.ModelViewSet):
    serializer_class = ActionSerializer
    queryset =  Action.objects.all()

class BuyView(viewsets.ModelViewSet):
    serializer_class = BuySerializer
    queryset =  Buy.objects.all()

class CountryView(viewsets.ModelViewSet):
    serializer_class = CountrySerializer
    queryset =  Country.objects.all()

class ManagerView(viewsets.ModelViewSet):
    serializer_class = ManagerSerializer
    queryset =  Manager.objects.all()

class BrokerView(viewsets.ModelViewSet):
    serializer_class = BrokerSerializer
    queryset =  Broker.objects.all()

class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset =  Currency.objects.all()