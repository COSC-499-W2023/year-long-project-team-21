from django.shortcuts import render, redirect
from Advertisments.forms import AdvertismentForm
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

class AdvertismentView(APIView):

    authentication_classes = (JWTAuthentication, )
    permission_classes = (IsAuthenticated, )

    def add_advertisment(self, request):
        '''
        Method to add a new advertisment to the database.

        Request method must be POST
        '''
        form = AdvertismentForm
        
        # if not POST return bad request
        if request.method != 'POST':
            return Response(status=status.HTTP_400_BAD_REQUEST)

        form = AdvertismentForm(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
            context = {'form': form}
            #return render(request, 'index.html', context)
            return Response(status=status.HTTP_201_CREATED, context=context)
        else:
            Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

       