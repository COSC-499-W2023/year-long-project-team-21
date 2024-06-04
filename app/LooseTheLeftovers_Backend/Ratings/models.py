from django.db import models

# Create your models here.
class Rating(models.Model):
    rating = models.FloatField()
    giver_id = models.IntegerField()
    receiver_id = models.IntegerField()

    def __str__(self):
        return str(self.giver_id) + ' to ' + str(self.receiver_id) + ': rating=' + str(self.rating)