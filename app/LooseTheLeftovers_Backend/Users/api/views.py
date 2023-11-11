from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

# import serializers
from Users.api.serializers import RegistrationSerializer


@api_view(["POST"])
def registration_view(request):
    # deserialize incoming data
    serializer = RegistrationSerializer(data=request.data)
    # check
    if serializer.is_valid():
        # if the user is valid, invoke overriden save method to gain access to user object
        user = serializer.save()
        # retrieve user's newly created token
        try:
            token = Token.objects.get(user_id=user.id)
            return Response({"token": token.key}, status=status.HTTP_200_OK)

        except:
            # return a 500 if there is an error retrieving token
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        # if the user is not valid, place errors inside token placeholder
        error = serializer.errors
        return Response(error, status=status.HTTP_400_BAD_REQUEST)
