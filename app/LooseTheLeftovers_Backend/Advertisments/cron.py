import datetime

from Advertisments.models import Advertisment

def delete_expired_ads():
    expired_ads = Advertisment.objects.filter(expiry__lte = datetime.date.today())

    n = 0
    for ad in expired_ads:
        ad.delete()
        n += 1
    
    return n