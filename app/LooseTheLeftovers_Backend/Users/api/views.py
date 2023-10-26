from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view

# from rest_framework.reponse import Response


# Create your views here.
def HelloWorld(request):
    print("Hello world")
    return HttpResponse("faather")
