from rest_framework.test import APITestCase
from Users.models import CustomUser


class TestSetUp(APITestCase):
    def setUp(self):
        # create temp user
        self.test_user = CustomUser.objects.create_user(username="test", password="test123", postal_code="V0E1V4")
        # save temp user credentials in db
        self.test_account = {
            "username": "test",
            "password": "test123",
            "postal_code": "V0E1V4",
        }
        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        self.test_user = CustomUser.objects.get(username="test")
        return super().tearDown()