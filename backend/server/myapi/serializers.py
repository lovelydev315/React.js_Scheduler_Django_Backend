from rest_framework import serializers

from .models import Events
from .models import Holiday
from .models import Vacancy

class EventsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Events
        fields = ('id','start_date', 'end_date', 'name', 'description','event_id')

class HolidaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Holiday
        fields = ('id','start_date', 'end_date', 'name', 'description')

class VacancySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vacancy
        fields = ('id','start_date', 'end_date', 'name', 'description')