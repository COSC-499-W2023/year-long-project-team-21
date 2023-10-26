import json
from django.urls import reverse
from rest_framework import status
from .test_setup import TestSetUpCreateAccount
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class TestUserAuth(TestSetUpCreateAccount):
    """
    Test cases for views related to user authentication.
    """

    # URL endpoint for token generation/authentication.
    __login_url = reverse("token")

    def test_user_authentication_no_body(self):
        """
        Test if posting to the authentication endpoint without a request body
        results in a 400 Bad Request response.
        """
        response = self.client.post(self.__login_url)

        # Assert that the response status code is 400 Bad Request.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_authentication_with_valid_account(self):
        """
        Test if posting to the authentication endpoint with valid user
        credentials returns a 200 OK response and a valid token.

        This test also verifies if the token returned in the response
        matches the token stored in the database for the authenticated user.
        """

        # Authenticate using the stored test account credentials.
        response = self.client.post(
            self.__login_url,
            self.test_account,
            format="json",
        )

        # Assert that the response status code is 200 OK.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Extract the token from the response.
        response_token = json.loads(response.content.decode("utf-8"))["token"]
        # Query the database for the user ID using the username.
        user_id = User.objects.get(username=self.test_user).id

        # Retrieve the authentication token for the user from the database.
        token = Token.objects.get(user_id=user_id)

        # Assert that the token in the response matches the token in the database.
        self.assertEqual(response_token, str(token))

    def test_user_authentication_with_invalid_credentials(self):
        # Authenticate using the incorrect credentials
        response = self.client.post(
            self.__login_url,
            {"username": "invalid", "password": "invalid1"},
            format="json",
        )

        # Assert that the response status code is 400 Bad Request.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
