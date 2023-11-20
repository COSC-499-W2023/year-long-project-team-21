from django.db import models

# Create your models here.
class Message(models.Model):
    msg = models.CharField(max_length=1000)
    time_sent = models.DateTimeField(auto_now_add=True)
    sender_id = models.IntegerField()
    receiver_id = models.IntegerField()
    ad_id = models.IntegerField()

    def __str__(self):
        return str(self.pk) + ': ' + self.msg