from .test_setup import TestSetUpCreateAccount
from Users.models import CustomUser
from rest_framework.authtoken.models import Token
from django.test import Client
from django.urls import reverse


class TestModels(TestSetUpCreateAccount):
    def test_token_creation(self):
        """
        Test if created user has authentication token
        """
        # get user id from test_user
        user_id = CustomUser.objects.get(username=self.test_user).id
        # query authtoken_token to see if token exists for user
        token = Token.objects.get(user_id=user_id)
        # assert
        self.assertIsNotNone(token)

    def test_create_new_user(self):
        """
        Test if created test user exists in database
        """
        username = CustomUser.objects.get(username=self.test_user).username
        self.assertEqual(username, "test")

    def test_create_user_with_postal_code(self):
        """
        Test if created test user has custom field postal_code in database
        """
        postal_code = CustomUser.objects.get(username=self.test_user).postal_code
        self.assertEqual(postal_code, "V0E1V4")

    def test_update_postal_code(self):
        """
        Test if a field (postal_code) can be updated for existing user
        """
        client = Client()
        data = {
            "username": "test", 
            "postal_code": "V1X1H0"
        }
        response = client.post(
            reverse("users"), 
            data
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.test_user.postal_code, "V1X1H0")

    def test_add_email(self):
        """
        Test if a field that is blank can be filled in after account creation
        """
        pass
