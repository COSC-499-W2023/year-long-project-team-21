import json
from django.urls import reverse
from rest_framework import status
from .test_setup import TestSetUpCreateAccount
from Users.models import CustomUser
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

"""
Test cases for views related to user authentication.
"""


class TestUserAuth(TestSetUpCreateAccount):
    # URL endpoint for token generation/authentication.
    __login_url = reverse("token")

    def test_user_authentication_no_body(self):
        """
        Test sending auth request without body, expect 400
        """
        response = self.client.post(self.__login_url)

        # Assert that the response status code is 400 Bad Request.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_authentication_with_valid_account(self):
        """
        Test sending auth request with valid account in body, expect 200
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
        user_id = CustomUser.objects.get(username=self.test_user).id
        # Retrieve the authentication token for the user from the database.
        token = Token.objects.get(user_id=user_id)
        # Assert that the token in the response matches the token in the database.
        self.assertEqual(response_token, str(token))

    def test_user_authentication_with_invalid_credentials(self):
        """
        Test sending invalid credentials for auth, expect 400
        """

        # Authenticate using the incorrect credentials
        response = self.client.post(
            self.__login_url,
            {"username": "invalid", "password": "invalid1"},
            format="json",
        )

        # Assert that the response status code is 400 Bad Request.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestUserCreation(APITestCase):
    # URL endpoint for registering User
    __register_url = reverse("register")

    def query_and_test_user(self, username):
        try:
            user = CustomUser.objects.get(username="test123")
            self.assertIsNotNone(user)
        except CustomUser.DoesNotExist:
            self.fail("User does not exist")

    def test_creating_new_user(self):
        """
        Test sending a POST request with valid credentials to create a new user. Expecting 200 as the response.
        """

        # send a post request, save response
        response = self.client.post(
            self.__register_url,
            {
                "email": "test@123.com",
                "username": "test123",
                "password": "testcase12",
                "verify_password": "testcase12",
            },
            format="json",
        )

        # test if appropriate response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # check if user in the database
        self.query_and_test_user("test123")
