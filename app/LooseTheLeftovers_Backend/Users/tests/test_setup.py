from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

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
            username="test",
            password="test123",
            latitude=49.887673,
            longitude=-119.495465,
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

class TestSetUpUpdateAccount(APITestCase):

    def setUp(self):
        # create 2 test users
        self.username_1 = "user_1"
        self.password_2 = "123"
        self.user_1 = CustomUser.objects.create_user(
            username=self.username_1,
            password=self.password_2
        )
        self.user_1.save()

        self.username_1 = "user_2"
        self.password_2 = "456"
        self.user_2 = CustomUser.objects.create_user(
            username=self.username_1,
            password=self.password_2
        )
        self.user_2.save()

        # get token for user_1
        token = RefreshToken.for_user(self.user_1)
        self.token = str(token.access_token)
        self.refresh = str(token)

        return super().setUp()

    def tearDown(self):
        return super().tearDown()