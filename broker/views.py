from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializer import UserSerializer, ActionSerializer, BuySerializer, CountrySerializer, ManagerSerializer, BrokerSerializer, CurrencySerializer
from .models import User, Action, Buy, Country, Manager, Broker, Currency

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ActionView(viewsets.ModelViewSet):
    serializer_class = ActionSerializer
    queryset = Action.objects.all()

class BuyView(viewsets.ModelViewSet):
    serializer_class = BuySerializer
    queryset = Buy.objects.all()

class CountryView(viewsets.ModelViewSet):
    serializer_class = CountrySerializer
    queryset = Country.objects.all()

class ManagerView(viewsets.ModelViewSet):
    serializer_class = ManagerSerializer
    queryset = Manager.objects.all()

class BrokerView(viewsets.ModelViewSet):
    serializer_class = BrokerSerializer
    queryset = Broker.objects.all()

class CurrencyView(viewsets.ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()

class UserCreateAPIView(viewsets.ViewSet):
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def LoginUser(request):
    user = get_object_or_404(User, mail=request.data['mail'])
    if user.password != request.data['password']:
        return Response({'error': 'Contraseña invalida'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(instance=user)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class ActionsByCountryView(APIView):
    def get(self, request, country):
        country_map = {"Colombia": 1, "Argentina": 2, "Mexico": 3, "Peru": 4, "Chile": 5}
        country_id = country_map.get(country)
        if country_id is None:
            return Response({"detail": "Invalid country"}, status=status.HTTP_400_BAD_REQUEST)
        
        actions = Action.objects.filter(country=country_id)
        if actions.exists():
            serializer = ActionSerializer(actions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No actions found for this country"}, status=status.HTTP_404_NOT_FOUND)

class ManagersByCountryView(APIView):
    def get(self, request, country):
        country_map = {"Colombia": 1, "Chile": 2, "Mexico": 3, "Peru": 4, "Argentina": 6}
        country_id = country_map.get(country)
        if country_id is None:
            return Response({"detail": "Invalid country"}, status=status.HTTP_400_BAD_REQUEST)
        
        managers = Manager.objects.filter(country=country_id)
        if managers.exists():
            serializer = ManagerSerializer(managers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No managers found for this country"}, status=status.HTTP_404_NOT_FOUND)

class BrokersByCountryView(APIView):
    def get(self, request, country):
        country_map = {"Colombia": 1, "Chile": 2, "Mexico": 3, "Peru": 4, "Argentina": 6}
        country_id = country_map.get(country)
        if country_id is None:
            return Response({"detail": "Invalid country"}, status=status.HTTP_400_BAD_REQUEST)
        
        brokers = Broker.objects.filter(country=country_id)
        if brokers.exists():
            serializer = BrokerSerializer(brokers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No brokers found for this country"}, status=status.HTTP_404_NOT_FOUND)