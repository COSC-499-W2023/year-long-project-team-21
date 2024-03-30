from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from Users.models import CustomUser
from Users.api.serializers import RegistrationSerializer
from Users.api.serializers import TokenObtainPairSerializerUserId
from Users.api.serializers import UserSerializer
from Users.api.serializers import UpdateUserSerializer

from django_rest_passwordreset.signals import reset_password_token_created

############################################# VIEWS.PY #############################################

class TokenObtainPairSerializerUserId(TokenObtainPairView):
    """
    A custom view for token obtainment that uses TokenObtainPairSerializerUserId.

    This view extends TokenObtainPairView from Django Rest Framework SimpleJWT
    to use a custom serializer (TokenObtainPairSerializerUserId) for handling
    the token creation logic.

    Attributes:
    serializer_class: The serializer class to be used for token obtainment.
                        Should be set to TokenObtainPairSerializerUserId or
                        another custom serializer extending TokenObtainPairSerializer.
    """

    serializer_class = TokenObtainPairSerializerUserId


class UsersHandler(APIView):
    """
    API View for handling user-related requests.

    This view handles creating new users with POST requests and retrieving
    specific users or all users with GET requests.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new user.

        Args:
        request (HttpRequest): The request object containing the user data.

        Returns:
        Response: DRF Response object with the creation status.
        """
        return register_user(request)

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests to retrieve a specific user or all users.

        Retrieves a specific user if a user_id is provided in the URL,
        otherwise retrieves all users. Requires authentication.

        Args:
            request (HttpRequest): The request object.
            user_id (int, optional): The ID of the user to retrieve, passed as a URL keyword argument.

        Returns:
            Response: DRF Response object with the user data and HTTP status dependent on user auth and sucess
        """

        # retrieve user_id from keyword argument
        user_id = kwargs.get("user_id", None)
        # create instance of isAuthenticated, use to check if incoming request has permission
        permission = IsAuthenticated()
        # Manually check if the incoming request has permission to resource
        if not permission.has_permission(request, self):
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        # return user(s) data
        return retrieve_user(user_id)

    def put(self, request, *args, **kwargs):
        """
        Handle PUT requests to update a user's profile. Requires authentication.

        Args:
            request (HttpRequest): The request object.
            
            The request should have these fields in the body as json:
                -email
                -firstname
                -lastname

        Returns:
            Response: Response object with the user data and HTTP status dependent on user auth and sucess
        """
        # Manually check if the incoming request has permission to resource
        permission = IsAuthenticated()
        if not permission.has_permission(request, self):
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        
        if 'new_password' in request.data.keys():
            return update_password(request)
        else:
            return update_user(request)
        
def register_user(request):
    """
    POST request to handle user creation. Returns a authentication token

    Handles a POST request with 'username', 'email', 'password', and 'verify_password'. Serializer = RegistrationSerializer
    calls the registration serializer which is responsible for ensuring fields are correct. On successful verification, it returns the newly
    created authenticaation token and sends that in the response body along with a 200. Serializer.save() calls the overwritten serializer method.
    Refer to Users/serializer for more information

    The view expects an HTTP POST request containing:
        - username
        - email
        - password
        - verify_password

    Parameters: POST HTTP request

    Returns:
        - If successful, returns a HTTP response 200 and an authentication token
        - If unsuccessful, retuurns an HTTP response 400 along with the response generated by the serializer.
    """

    # deserialize incoming data
    serializer = RegistrationSerializer(data=request.data)
    # check
    if serializer.is_valid():
        # if the user is valid, invoke overriden save method to gain access to user object
        user = serializer.save()
        # retrieve user's newly created token
        try:
            return Response(status=status.HTTP_200_OK)

        except:
            # return a 500 if there is an error retrieving token
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        # if the user is not valid, place errors inside token placeholder
        error = serializer.errors
        return Response(error, status=status.HTTP_400_BAD_REQUEST)


def retrieve_user(user_id):
    """
    Retrieve a specific user by their ID or all users if no ID is provided.

    Args:
    user_id (int, optional): The ID of the user to retrieve. If None, retrieves all users.

    Returns:
    Response: DRF Response object containing the user data and HTTP status.

    If a user_id is provided, the function attempts to retrieve the specific user.
    If no user_id is provided, it retrieves all users. In case of any exceptions,
    an appropriate error message is included in the response with a server error status.
    """

    if user_id is None:
        try:
            # query users
            users = CustomUser.objects.all().order_by("id")
            # send to serializer to package data
            serializer = UserSerializer(users, many=True)
            # send response, 200 ok
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            # send problem response and server error
            response = {"message": "Error retrieving users"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        try:
            # query user by id
            user = CustomUser.objects.get(pk=user_id)
            # send to serializer to package data
            serializer = UserSerializer(user)
            # send response, 200 ok
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            # send problem response and server error
            response = {"message": "Error retrieving users: user does not exist"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def update_user(request):
    """
    PUT request to update a user's information.
    Uses the UpdateUserSerializer class to validate input and update the
    user instance.

    Fields that can be updated
        -email
        -firstname
        -lastname
    """
    # get user_id from request
    try:
        user_id = request.user.id
        user = CustomUser.objects.get(pk=user_id)

        serializer = UpdateUserSerializer(user, request.data)
        if serializer.is_valid():
            # if valid save updated ad
            serializer.save() 
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            # if serializer returned errors on validation return errors and HTTP_400 status
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        # if error occurs return error message and detail with HTTP_500 status
        response = {"message": "Error updating post", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def update_password(request):
    """
    PUT request to update a user's password.
    Uses the UpdatePasswordSerializer class to validate input and update the
    password for the user.

    Request must contain
        -old_password
        -new_password
        -confirm_password
    """
    old_password = request.data['old_password']
    new_password = request.data['new_password']
    confirm_password = request.data['confirm_password']
    
    # if user didn't enter their correct password return error message and HTTP 401 response
    if not check_password(old_password, request.user.password):
        return Response({'detail': 'Incorrect password entered'}, status=status.HTTP_401_UNAUTHORIZED)
    
    # if user didn't enter same password twice return error message and HTTP 400 response
    if new_password != confirm_password:
        return Response({'detail': 'Passwords must match'}, status=status.HTTP_400_BAD_REQUEST)
    
    # old password entered correct and new passwords match:
    #   save new password and return message and HTTP 200 response
    user = request.user
    user.set_password(new_password)
    user.save()
    return Response({'detail': 'Password changed successfully'}, status=status.HTTP_200_OK)


############################################# RECIEVERS.PY #############################################


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    print("hello world!")
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)
    }


    print(context)

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    print(email_html_message)
    print(email_plaintext_message)

    """

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
    """
