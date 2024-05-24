from django.contrib import admin
from .models import User, Action, Buy, Manager, Country

admin.site.register(User)
admin.site.register(Action)
admin.site.register(Buy)
admin.site.register(Manager)
admin.site.register(Country)

