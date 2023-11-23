from .test_setup import TestSetUpCreateAccount
from Users.models import CustomUser
from rest_framework.authtoken.models import Token

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

    def test_create_user_location(self):
        """
        Test if created test user has custom field postal_code in database
        """
        latitude = CustomUser.objects.get(username=self.test_user).latitude
        longitude = CustomUser.objects.get(username=self.test_user).longitude
        self.assertAlmostEqual(float(latitude), 49.887673)
        self.assertAlmostEqual(float(longitude), -119.495465)

    def test_update_postal_code_user(self):
        """
        Test if a field (location) can be updated for existing user
        """
        pass

    def test_add_email_user(self):
        """
        Test if a field that is blank can be filled in after account creation
        """
        pass
