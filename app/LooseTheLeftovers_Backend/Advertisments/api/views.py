from django.shortcuts import render, redirect
from Advertisments.forms import AdvertismentForm
from rest_framework.response import Response
from rest_framework import status

def add_advertisment(request):
    '''
    Method to add a new advertisment to the database.

    Request method must be POST
    '''
    form = form = AdvertismentForm
    
    if request.method == 'POST':
        form = AdvertismentForm(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
            context = {'form': form}
            return render(request, 'index.html', context)
        else:
            Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # if not POST return bad request
    return Response(status=status.HTTP_400_BAD_REQUEST)