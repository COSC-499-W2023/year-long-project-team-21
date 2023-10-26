from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class TestSetUpCreateAccount(APITestCase):
    def setUp(self):
        # create temp user
        self.test_user = User.objects.create_user(username="test", password="test123")
        # save temp user credentials in db
        self.test_account = {
            "username": "test",
            "password": "test123",
        }
        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        self.test_user = User.objects.get(username="test")
        return super().tearDown()
