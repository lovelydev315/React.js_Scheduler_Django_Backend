from django.db import models

# Create your models here.

class Events(models.Model):
    start_date = models.CharField(max_length=60)
    end_date = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=60)
    event_id = models.BigIntegerField(max_length=100)
    def __str__(self):
        return self.event_id

class Holiday(models.Model):
    start_date = models.CharField(max_length=60)
    end_date = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=60)
    def __str__(self):
        return self.name

class Vacancy(models.Model):
    start_date = models.CharField(max_length=60)
    end_date = models.CharField(max_length=60)
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=60)
    def __str__(self):
        return self.name
