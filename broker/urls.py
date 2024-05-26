from django.urls import path, include, re_path
from rest_framework import routers
from .views import UserView, ActionView, BuyView, CountryView, ManagerView, BrokerView, CurrencyView, UserCreateAPIView, ActionsByCountryView

router = routers.DefaultRouter()
router.register(r"users", UserView, "users")
router.register(r"actions", ActionView, "actions")
router.register(r"buys", BuyView, "buys")
router.register(r"countries", CountryView, "countries")
router.register(r"managers", ManagerView, "managers")
router.register(r"brokers", BrokerView, "brokers")
router.register(r"currencys", CurrencyView, "currencys")
router.register(r"create-user", UserCreateAPIView, "create-user")

urlpatterns = [
    path("api/v1/", include(router.urls)),
]