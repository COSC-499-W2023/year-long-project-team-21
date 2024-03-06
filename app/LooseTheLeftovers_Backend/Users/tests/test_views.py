import json
from django.urls import reverse
from rest_framework import status
from .test_setup import TestSetUpCreateAccount, TestSetUpUpdateAccount
from Users.models import CustomUser
from rest_framework.test import APIClient, APITestCase
from Users.api.serializers import UserSerializer


"""
Test cases for views related to user authentication and creation
"""


class TestUserAuth(TestSetUpCreateAccount):
    # URL endpoint for token generation/authentication.
    __login_url = reverse("token_obtain_pair")

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
        Login should return both an access and refresh token in response
        """

        # Authenticate using the stored test account credentials.
        response = self.client.post(
            self.__login_url,
            self.test_account,
            format="json",
        )

        # Assert that the response status code is 200 OK.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        decoded_response = json.loads(response.content.decode("utf-8"))

        # Assert access token returned
        access_token = decoded_response["access"]
        self.assertTrue(access_token)

        # Assert refresh token returned
        refresh_token = decoded_response["refresh"]
        self.assertTrue(refresh_token)

        # Assert user_id returned
        user_id = decoded_response["user_id"]
        self.assertTrue(user_id)

    def test_user_authentication_with_invalid_credentials(self):
        """
        Test sending invalid credentials for auth, expect 401
        """

        # Authenticate using the incorrect credentials
        response = self.client.post(
            self.__login_url,
            {"username": "invalid", "password": "invalid1"},
            format="json",
        )

        # Assert that the response status code is 401 Unauthorized.
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestUserCreation(APITestCase):
    # URL endpoint for registering User
    __register_url = reverse("users")

    def query_and_test_user(self, username):
        try:
            user = CustomUser.objects.get(username="test123")
            self.assertIsNotNone(user)
            return user
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
        user = self.query_and_test_user("test123")
        self.assertEqual(user.username, "test123")

        self.delete_user(user.id)

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
        user_id = self.query_and_test_user("test123").id

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
        user_id = self.query_and_test_user("test123").id
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
        Test ensures that only a POST is accepted. Expected a 405 response for PUT and DELETE. GET should return a 401 as unauthorized.
        """

        # try for a get request
        response = self.client.get(self.__register_url)

        # test for a 401 since authentication is not supplied
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # try for a delete
        response = self.client.delete(self.__register_url)

        # test for a 405
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class TestGetUsers(TestSetUpCreateAccount):
    # URL for ads.
    __users_url = reverse("users")

    def test_retrieve_list_of_users_no_auth(self):
        """ "
        Test ensures that a list of users are not retrieved on an unauthorized get request without ID specified. Expect a 401.
        """

        response = self.client.get(self.__users_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_single_user_no_auth(self):
        """
        Test ensures that a single user is not retrieved on an unathorized get request. Expect a 401.
        """

        # retrieve user id
        specific_user_id = self.test_user.id

        # create get request using kwargs
        specific_user_url = reverse(
            "specific_user", kwargs={"user_id": specific_user_id}
        )

        # send unauth request
        response = self.client.get(specific_user_url)

        # assert that a 401 is returned
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_list_of_users_force_auth(self):
        """
        Test ensures that a list of users are retrieved on authorized GET request.
        Expect a 200 and correct response body.
        """

        # Force authentication for testing
        self.client.force_authenticate(user=self.test_user)

        # Retrieve response
        response = self.client.get(self.__users_url)

        # Assert a 200 correctly received
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Get all users from the database
        users = CustomUser.objects.all().order_by(
            "id"
        )  # Ensure ordering for comparison

        # Serialize the users data for comparison
        serializer = UserSerializer(users, many=True)

        # Compare the response data with the serialized data
        self.assertEqual(response.data, serializer.data)

    def test_retrieve_individual_user_force_auth(self):
        """
        Test ensures that an individual (in our case, requesting user) credentials are retrieved with an authorized GET request. Expect a 200 and correct body.
        """

        # Retrieve user id
        specific_user_id = self.test_user.id

        # Create GET request URL using kwargs
        specific_user_url = reverse(
            "specific_user", kwargs={"user_id": specific_user_id}
        )

        # Force authentication for testing
        self.client.force_authenticate(user=self.test_user)

        # Send authorized request
        response = self.client.get(specific_user_url)

        # Assert that a 200 OK response is received
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Validate the response content
        expected_data = UserSerializer(self.test_user).data
        self.assertEqual(response.data, expected_data)

    def test_retrieve_list_of_new_users_auth(self):
        """
        Test ensures that a list of users, including newly created ones, are retrieved on an authorized GET request.
        Expect a 200 and correct response body.
        """

        # Create additional users
        CustomUser.objects.create_user(username="testuser1", password="testpassword1")
        CustomUser.objects.create_user(username="testuser2", password="testpassword2")

        # Force authentication for testing
        self.client.force_authenticate(user=self.test_user)

        # Retrieve response
        response = self.client.get(self.__users_url)

        # Assert a 200 correctly received
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Get all users from the database, including the newly added ones
        users = CustomUser.objects.all().order_by(
            "id"
        )  # Ensure ordering for comparison

        # Serialize the users data for comparison
        serializer = UserSerializer(users, many=True)

        # Compare the response data with the serialized data
        self.assertEqual(response.data, serializer.data)

    def test_user_not_exist_auth(self):
        """
        Test ensures that a user that trying to retrieve a user that does not exist produces an error. Expect a 500
        """

        # Retrieve user id
        specific_user_id = self.test_user.id

        # modify url
        specific_user_id += 1

        # Create GET request URL using kwargs
        specific_user_url = reverse(
            "specific_user", kwargs={"user_id": specific_user_id}
        )

        # Force authentication for testing
        self.client.force_authenticate(user=self.test_user)

        # Send authorized request
        response = self.client.get(specific_user_url)

        # test for 500
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

class TestUpdateUsers(TestSetUpUpdateAccount):
    __users_url = reverse("users")

    def test_update_user_profile(self):
        """
        Test if user profile can be updated via PUT request
        """
        client = APIClient()
        data = {
            'email': 'newemail@mail.com',
            'first_name': "John",
            'last_name': "Smith",
            'latitude': self.user_1.latitude,
            'longitude': self.user_1.longitude,
        }

        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )

        # assert HTTP_200 response 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get updated ad and assert title was updated
        updated_user = CustomUser.objects.get(pk=self.user_1.id)
        self.assertEqual(updated_user.email, "newemail@mail.com")  
        self.assertEqual(updated_user.first_name, "John")
        self.assertEqual(updated_user.last_name, "Smith")

    def test_update_user_profile_no_auth(self):
        """
        Test if user profile can be updated via PUT request but without including 
        autherization token. Expect 401 response
        """
        client = APIClient()
        data = {
            'email': 'newemail@mail.com',
            'first_name': "John",
            'last_name': "Smith",
            'latitude': self.user_1.latitude,
            'longitude': self.user_1.longitude,
        }

        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            format="json",
        )

        # assert HTTP_401 response 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_profile_invalid_email(self):
        """
        Test if user profile can be updated via PUT request but include
        an invalid email address format. Expect 400 response.
        """
        client = APIClient()
        data = {
            'email': 'ThisIsNotAnEmail',
            'first_name': "John",
            'last_name': "Smith",
            'latitude': self.user_1.latitude,
            'longitude': self.user_1.longitude,
        }

        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )

        # assert HTTP_400 response 
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_password(self):
        """
        Test if user password can be updated via PUT request
        """
        client = APIClient()
        data = {
            'old_password': '123',
            'new_password': 'newpassword',
            'confirm_password': 'newpassword',
        }
        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )

        # assert HTTP_200 response 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get updated ad and assert title was updated
        updated_user = CustomUser.objects.get(pk=self.user_1.id)
        self.assertTrue(updated_user.check_password("newpassword"))

    def test_update_password_no_auth(self):
        """
        Test if user password can be updated via PUT request but do not 
        include authorization token in request. Expect 401 response
        """
        client = APIClient()
        data = {
            'old_password': '123',
            'new_password': 'newpassword',
            'confirm_password': 'newpassword',
        }
        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            format="json",
        )

        # assert HTTP_401 response 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_password_wrong_current_password(self):
        """
        Test if user password can be updated via PUT request but current
        password is incorrect. Expect 401 response and error detail message
        """
        client = APIClient()
        data = {
            'old_password': 'WrongPassword',
            'new_password': 'newpassword',
            'confirm_password': 'newpassword',
        }
        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )

        # assert HTTP_401 response and error message
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], 'Incorrect password entered')

    def test_update_password_new_password_dont_match(self):
        """
        Test if user password can be updated via PUT request but new password and 
        confirmation password do no match. Expect 400 response and error detail message
        """
        client = APIClient()
        data = {
            'old_password': '123',
            'new_password': 'newpassword',
            'confirm_password': 'DoesNotMatch',
        }
        # post request and assert valid response
        response = client.put(
            self.__users_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )

        # assert HTTP_400 response and error message
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Passwords must match')