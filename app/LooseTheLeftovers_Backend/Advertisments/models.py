from django.db import models
import datetime

# Create your models here.
class Advertisment(models.Model):
    user_id = models.IntegerField()
    title = models.TextField(max_length=50)
    description = models.TextField(max_length=1000)
    #image = models.ImageField()
    category = models.TextField(max_length=20)
    expiry = models.DateTimeField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    view_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.000000)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=0.000000)

    def __str__(self):
        return str(self.pk) + ': ' + self.title