from django.contrib import admin

from schedule.models import Conflict, Event

# Register your models here.
admin.site.register(Conflict)
admin.site.register(Event)