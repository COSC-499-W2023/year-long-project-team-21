from rest_framework.test import APITestCase
from Users.models import CustomUser


class TestSetUpCreateAccount(APITestCase):
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
