import json
from django.urls import reverse
from rest_framework import status
from .test_setup import TestSetUpCreateAccount
from Users.models import CustomUser
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

"""
Test cases for views related to user authentication and creation
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
            return user.id
        except CustomUser.DoesNotExist:
            self.fail("User does not exist")
            return None

    def delete_user(self, userid):
        try:
            user = CustomUser.objects.get(id=userid)
            user.delete()
        except CustomUser.DoesNotExist:
            self.fail("User with id {} does not exist".format(userid))
            return None

    def test_creating_new_user_correct_fields(self):
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
        user_id = self.query_and_test_user("test123")
        # check if correct token is in response
        if user_id is not None:
            # retrieve response token
            response_token = json.loads(response.content.decode("utf-8"))["token"]
            # query token in database based on id
            token = Token.objects.get(user_id=user_id)
            self.assertEqual(response_token, str(token))
            self.delete_user(user_id)

    def test_creating_new_user_wrong_email(self):
        """
        Test sending a POST request with invalid email to create a new user. Expecting 400 response.
        """

        # send a post request with incorrect credentials
        response = self.client.post(
            self.__register_url,
            {
                "email": "test",
                "username": "test123",
                "password": "testcase12",
                "verify_password": "testcase12",
            },
            format="json",
        )

        # test for a bad request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # test correct response
        self.assertIn("email", response.data)
        self.assertEqual(str(response.data["email"][0]), "Enter a valid email address.")

    def test_creating_new_user_passwords_not_same(self):
        """
        Test sending a POST request with incorrect password and verify password not being the same. Expecting 400 response
        """

        # send a post request with incorrect credentials
        response = self.client.post(
            self.__register_url,
            {
                "email": "test@test.com",
                "username": "test123",
                "password": "testcase12",
                "verify_password": "casetest12",
            },
            format="json",
        )

        # test for a bad request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # test correct response
        self.assertIn("password", response.data)
        self.assertEqual(str(response.data["password"]), "Passwords must match")

    def test_creating_new_user_with_existing_username(self):
        """
        Test creates a user and then creates another user with the same username. Expecting 400 response
        """

        # send a post request with correct credentials
        response = self.client.post(
            self.__register_url,
            {
                "email": "ryan@test.com",
                "username": "test123",
                "password": "testcase12",
                "verify_password": "testcase12",
            },
            format="json",
        )

        # test for a 200 indicating that a user is made
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # query user
        user_id = self.query_and_test_user("test123")

        # send another post request with the same credentials
        next_response = self.client.post(
            self.__register_url,
            {
                "email": "test@test.com",
                "username": "test123",
                "password": "testcase12",
                "verify_password": "testcase12",
            },
            format="json",
        )

        # test for a bad request
        self.assertEqual(next_response.status_code, status.HTTP_400_BAD_REQUEST)

        # test correct response
        self.assertIn("username", next_response.data)
        self.assertEqual(
            str(next_response.data["username"][0]),
            "A user with that username already exists.",
        )

        # delete user
        self.delete_user(user_id)

    def test_creating_new_user_same_with_existing_email(self):
        """
        Test creates a user and then creates another user with the same email. Expecting 400 response
        """

        # send a post request with correct credentials
        response = self.client.post(
            self.__register_url,
            {
                "email": "test@test.com",
                "username": "test123",
                "password": "testcase12",
                "verify_password": "testcase12",
            },
            format="json",
        )

        # test for a 200 indicating that a user is made
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # send another post request with the same credentials
        next_response = self.client.post(
            self.__register_url,
            {
                "email": "test@test.com",
                "username": "123test123",
                "password": "testcase12",
                "verify_password": "testcase12",
            },
            format="json",
        )

        # test for a bad request
        self.assertEqual(next_response.status_code, status.HTTP_400_BAD_REQUEST)

        # test correct response
        self.assertIn("email", next_response.data)
        self.assertEqual(
            str(next_response.data["email"][0]),
            "A user with that email already exists.",
        )

        # delete user
        user_id = self.query_and_test_user("test123")
        self.delete_user(user_id)

    def test_incorrect_body_parameters_only_email_and_password(self):
        """
        Test ensures that if incorrect parameters are sent a 400 will be the response.
        """

        # send a post request with correct credentials
        response = self.client.post(
            self.__register_url,
            {
                "email": "test@test.com",
                "password": "testcase12",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_incorrect_body_parameters_no_verify_password(self):
        """
        Test ensures that if incorrect parameters are sent a 400 will be the response.
        """

        # send a post request with correct credentials
        response = self.client.post(
            self.__register_url,
            {
                "email": "test@test.com",
                "username": "123test123",
                "password": "testcase12",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # TODO this test is really important and we can use it for other things. We should figure out how to make this a class or something that all the other Apps can inherit from
    def test_try_other_request(self):
        """
        Test ensures that only a POST is accepted. Expected a 405 response
        """

        # try for a get request
        response = self.client.get(self.__register_url)

        # test for a 405
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # try for a put
        response = self.client.put(self.__register_url)

        # test for a 405
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # try for a put
        response = self.client.delete(self.__register_url)

        # test for a 405
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
