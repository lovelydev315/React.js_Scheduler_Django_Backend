from django.shortcuts import render

# Create your views here.
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from rest_framework import viewsets

from .serializers import EventsSerializer
from .models import Events

from .serializers import HolidaySerializer
from .models import Holiday

from .serializers import VacancySerializer
from .models import Vacancy

class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all().order_by('name')
    serializer_class = EventsSerializer

class HolidayViewSet(viewsets.ModelViewSet):
    queryset = Holiday.objects.all().order_by('name')
    serializer_class = HolidaySerializer

class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all().order_by('name')
    serializer_class = VacancySerializer


# class EventsViewSet(viewsets.ModelViewSet):
#     queryset = Events.objects.all().order_by('name')
#     serializer_class = EventsSerializer

#     def retrieve(self, request):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance)
#         data = serializer.data
#         response = Response(data)
#         response['Access-Control-Allow-Origin'] = '*'
#         return response