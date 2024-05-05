from django.urls import path, include
from rest_framework import routers
from broker import views

router = routers.DefaultRouter()
router.register(r"users", views.UserView, basename="users")
router.register(r"actions", views.ActionView, basename="actions")
router.register(r"buys", views.BuyView, basename="buys")
router.register(r"countrys", views.CountryView, basename="countrys")
router.register(r"managers", views.ManagerView, basename="managers")
router.register(r"brokers", views.BrokerView, basename="brokers")
router.register(r"currencys", views.CurrencyView, basename="currencys")

urlpatterns = [
    path("api/v1/", include(router.urls))
]