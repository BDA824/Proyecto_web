from django.contrib import admin
from .models import action, buy, user, country, manager, broker, currency

admin.site.register(action)
admin.site.register(buy)
admin.site.register(user)
admin.site.register(country)
admin.site.register(manager)
admin.site.register(broker)
admin.site.register(currency)

