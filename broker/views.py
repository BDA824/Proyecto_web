from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import UserSerializer, ActionSerializer, BuySerializer, CountrySerializer, ManagerSerializer, BrokerSerializer, CurrencySerializer
from .models import User, Action, Buy, Country, Manager, Broker, Currency
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

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
    print(user)
    if user.password != request.data['password']:
        return Response ({'error': 'Contraseña invalida'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(instance=user)
    
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)   

class ActionsByCountryView(APIView):
    print("Entre a la validacion1")
    def get(self, request, country):
        print("Entre a la validacion", country)
        if country == "Colombia":
            country = 1
        if country == "Argentina":
            country = 2
        if country == "Mexico":
            country = 3
        if country == "Peru":
            country = 4
        if country == "Chile":
            country = 5
        
        actions = Action.objects.filter(country=country)
        if actions.exists():
            serializer = ActionSerializer(actions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No actions found for this country"}, status=status.HTTP_404_NOT_FOUND)

class ManagersByCountryView(APIView):
    print("Entre a la validacion1")
    def get(self, request, country):
        print("Entre a la validacion", country)
        if country == "Colombia":
            country = 1
        if country == "Argentina":
            country = 2
        if country == "Mexico":
            country = 3
        if country == "Peru":
            country = 4
        if country == "Chile":
            country = 5
        
        managers = Manager.objects.filter(country=country)
        if managers.exists():
            serializer = ManagerSerializer(managers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No managers found for this country"}, status=status.HTTP_404_NOT_FOUND)
    
class BrokersByCountryView(APIView):
    print("Entre a la validacion1")
    def get(self, request, country):
        print("Entre a la validacion", country)
        if country == "Colombia":
            country = 1
        if country == "Argentina":
            country = 2
        if country == "Mexico":
            country = 3
        if country == "Peru":
            country = 4
        if country == "Chile":
            country = 5
        
        brokers = Broker.objects.filter(country=country)
        if brokers.exists():
            serializer = BrokerSerializer(brokers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "No brokers found for this country"}, status=status.HTTP_404_NOT_FOUND)