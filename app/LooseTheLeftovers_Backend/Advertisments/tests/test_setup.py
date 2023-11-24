import json, datetime
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from Advertisments.models import Advertisment

class TestSetUpCreateAdvertisment(APITestCase):

    __login_url = reverse("token_obtain_pair")

    def setUp(self):

        # create test user
        self.username = "test_user"
        self.password = "123"
        self.user = get_user_model().objects.create_user(
            username=self.username,
            password=self.password
        )
        self.user.save()

        response = self.client.post(
            self.__login_url,
            {"username": self.username, "password": self.password},
            format="json"
        )
        
        token = RefreshToken.for_user(self.user)
        self.token = str(token.access_token)
        self.refresh = str(token)

        

        # create temp ad
        self.test_ad = Advertisment.objects.create(
            title="Test Ad",
            user_id = 1,
            description = "test",
            category = "Food",
            expiry = datetime.datetime(2023, 12, 12, 10, 30)
        )
        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        self.test_ad.delete()
        return super().tearDown()
