import datetime
from Advertisments.models import Advertisment

'''
This file contains method that can be scheduled to run in setting.py

Tasks can be scheduled by looking for the 'CRONJOBS' option and adding a 
time and task.
'''

def delete_expired_ads():
    '''
    Will query all ads that have an expiry <= today, then delete them.
    Returns the number of ads (for verification in testing).

    This method is a scheduled Cron job and executes automatically once per day.
    '''
    expired_ads = Advertisment.objects.filter(expiry__lte = datetime.date.today())

    n = 0
    for ad in expired_ads:
        ad.delete()
        n += 1
    
    return n