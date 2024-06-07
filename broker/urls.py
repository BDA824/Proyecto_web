from django.urls import path, include, re_path
from rest_framework import routers
from .views import UserView, ActionView, BuyView, CountryView, ManagerView, BrokerView, CurrencyView, UserCreateAPIView, ActionsByCountryView
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = routers.DefaultRouter()
router.register(r"create-user", UserCreateAPIView, "create-user")
router.register(r"users", UserView, "users")
router.register(r'users', UserView)
router.register(r"countries", CountryView, "countries")
router.register(r"managers", ManagerView, "managers")
router.register(r"actions", ActionView, "actions")
router.register(r"buys", BuyView, "buys")
router.register(r"brokers", BrokerView, "brokers")
router.register(r"currencys", CurrencyView, "currencys")

urlpatterns = [
    path('broker/api/v1/', include(router.urls)),
    path("api/v1/", include(router.urls)),
]