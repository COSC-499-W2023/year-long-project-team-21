from django.contrib.gis.db import models as geomodels
from django.db import models


class Advertisment(models.Model):
    user_id = models.IntegerField()
    title = models.TextField(max_length=50)
    description = models.TextField(max_length=1000, null=True)
    category = models.TextField(max_length=20)
    expiry = models.DateTimeField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    view_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    location = geomodels.PointField(geography=True, blank=True, null=True)

    def __str__(self):
        return str(self.pk) + ": " + self.title


class AdvertismentImage(models.Model):
    ad_id = models.OneToOneField(
        Advertisment, on_delete=models.CASCADE, related_name="ad_image"
    )
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return (
            str(self.pk)
            + ": "
            + self.image.url
            + " linked to ad number: "
            + str(self.ad_id)
        )
