from django.urls import path, include
from rest_framework import routers
from .views import UserView, ActionView, BuyView, CountryView, ManagerView, BrokerView, CurrencyView

router = routers.DefaultRouter()
router.register(r"users", UserView, "users")
router.register(r"actions", ActionView, "actions")
router.register(r"buys", BuyView, "buys")
router.register(r"countries", CountryView, "countries")
router.register(r"managers", ManagerView, "managers")
router.register(r"brokers", BrokerView, "bokers")
router.register(r"currencys", CurrencyView, "currencys")


urlpatterns = [
    path("api/v1/", include(router.urls)),
]