from django.contrib import admin
from .models import Advertisment, AdvertismentImage

# Register your models here.
admin.site.register(Advertisment)
admin.site.register(AdvertismentImage)