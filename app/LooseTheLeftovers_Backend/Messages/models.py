from django.db import models

from Advertisments.models import Advertisment

class Message(models.Model):
    msg = models.CharField(max_length=1000)
    time_sent = models.DateTimeField(auto_now_add=True)
    sender_id = models.IntegerField()
    receiver_id = models.IntegerField()
    ad_id = models.ForeignKey(Advertisment, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk) + ': ' + self.msg