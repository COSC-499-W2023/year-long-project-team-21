from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view

from ..models import CustomUser
from ..forms import EditCustomUserProfileForm

def edit_user_profile(request):

    if request.method == 'POST':

        model = CustomUser()
        test_user = CustomUser.objects.get(username=request.POST['username'])
        form = EditCustomUserProfileForm(request.POST or None, initial={'first_name': test_user.first_name, 'last_name': test_user.last_name, 'postal_code': test_user.postal_code})

        if form.is_valid():

            print(test_user.postal_code)

            test_user.postal_code = request.POST['postal_code']
            model.save()

            print(test_user.postal_code)
            print(test_user.first_name)

            context = {
                'form': form,
            }
            return render(request, 'home.html')
        
    context = {
        'username': test_user.username,
    }
    return render(request, 'home.html')