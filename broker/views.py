from rest_framework import viewsets
from .serializer import UserSerializer, ActionSerializer, BuySerializer, CountrySerializer, ManagerSerializer, BrokerSerializer, CurrencySerializer
from .models import user, action, buy, country, manager, broker, currency

class UserView(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset =  user.objects.all()

class ActionView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ActionSerializer
    queryset =  action.objects.all()

class BuyView(viewsets.ReadOnlyModelViewSet):
    serializer_class = BuySerializer
    queryset =  buy.objects.all()

class CountryView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CountrySerializer
    queryset =  country.objects.all()

class ManagerView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ManagerSerializer
    queryset =  manager.objects.all()

class BrokerView(viewsets.ReadOnlyModelViewSet):
    serializer_class = BrokerSerializer
    queryset =  broker.objects.all()

class CurrencyView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CurrencySerializer
    queryset =  currency.objects.all()