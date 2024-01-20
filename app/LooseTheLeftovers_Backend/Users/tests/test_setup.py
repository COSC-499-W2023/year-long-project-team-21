from rest_framework.test import APITestCase
from Users.models import CustomUser


class TestSetUpCreateAccount(APITestCase):
    """
    Test setup class for creating an account, extending APITestCase.

    This class provides a setup and teardown mechanism for tests that
    require a user account. It creates a temporary user in the database
    before each test and deletes it after the test is completed.

    Attributes:
        test_user (CustomUser): A temporary user created for testing.
        test_account (dict): A dictionary containing the credentials and
                            location information of the test user.
    """
    def setUp(self):
        # create temp user
        self.test_user = CustomUser.objects.create_user(
            username = "test", 
            password = "test123", 
            latitude = 49.887673,
            longitude = -119.495465,
        )
        # save temp user credentials in db
        self.test_account = {
            "username": "test",
            "password": "test123",
            "latitude": 49.887673,
            "longitude": -119.495465,
        }
        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        # delete user
        self.test_user = CustomUser.objects.get(username="test")
        self.test_user.delete()
        return super().tearDown()
