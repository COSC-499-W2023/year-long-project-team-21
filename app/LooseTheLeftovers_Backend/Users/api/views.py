from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# import serializers
from Users.api.serializers import RegistrationSerializer


@api_view(["POST"])
def registration_view(request):
    # deserialize incoming data
    serializer = RegistrationSerializer(data=request.data)
    # token placeholder for response
    token = {}
    # check
    if serializer.is_valid():
        # if the user is valid, invoke overriden save method to gain access to user object
        user = serializer.save()
        return Response(token, status=status.HTTP_200_OK)

    else:
        # if the user is not valid, place errors inside token placeholder
        token = serializer.errors
        return Response(token, status=status.HTTP_400_BAD_REQUEST)
