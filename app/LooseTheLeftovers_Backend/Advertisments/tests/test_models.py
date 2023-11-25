from Advertisments.models import Advertisment
from .test_setup import TestSetUpCreateAdvertisment
from django.urls import reverse
from rest_framework import status
import datetime
from LooseTheLeftovers_Backend.settings import BASE_DIR


from rest_framework.test import APIClient

class TestModels(TestSetUpCreateAdvertisment):

    __create_ad_url = reverse("create_ad")

    def test_create_new_ad(self):
        """
        Test if created test ad exists in database
        """
        ad = Advertisment.objects.get(pk=1)
        self.assertEqual(ad.title, "Test Ad")
        self.assertEqual(ad.description, "test")

    def test_post_new_ad(self):
        """
        Test if ad can be created via POST request
        """

        # login user and assert successful
        client = APIClient()
        # login_successful = client.login(username=self.username,
        #              password=self.password)
        # self.assertTrue(login_successful)

        # create request and assert successful
        data = {
            'user_id': 2,
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
        }

        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert new ad exists in database
        new_ad = Advertisment.objects.get(title="Bananas")
        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertEqual(new_ad.category, "Fruit")