from django.forms import ModelForm
from .models import Advertisment

class AdvertismentForm(ModelForm):
    class Meta:
        model = Advertisment
        fields = ['user_id', 'title','description','category','expiry']