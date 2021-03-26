from django.contrib import admin

# Register your models here.
from .models import Events
from .models import Holiday
from .models import Vacancy
admin.site.register(Holiday)