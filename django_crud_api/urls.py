"""
URL configuration for django_crud_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from broker import views

router = DefaultRouter()
router.register(r'users', views.UserView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('broker/', include('broker.urls')),
    re_path("login", views.LoginUser),
    path('api/actions/<str:country>/', views.ActionsByCountryView.as_view(), name='actions-by-country'),
    path('api/managers/<str:country>/', views.ManagersByCountryView.as_view(), name='managers-by-country'),
    path('api/brokers/<str:country>/', views.BrokersByCountryView.as_view(), name='brokers-by-country'),
    path('api/', include(router.urls)),
    path('users/<int:user_id>/join-gestora/', views.join_gestora, name='join-gestora'),
    path('users/<int:user_id>/join-broker/', views.join_broker, name='join-broker'),
]
