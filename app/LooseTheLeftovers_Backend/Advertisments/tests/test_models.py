from Advertisments.models import Advertisment
from .test_setup import TestSetUpCreateAdvertisment
from django.urls import reverse
from rest_framework import status
import datetime
from LooseTheLeftovers_Backend.settings import BASE_DIR

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

        json_payload = {
            'user_id': 1,
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': datetime.datetime(2023, 12, 12, 10, 30),
        }

        response = self.client.post(
            self.__create_ad_url,
            json_payload,
            format="json",
        )

        print(response)

        self.assertEqual(response.status_code, status.HTTP_200_OK)



        new_ad = Advertisment.objects.get(title="Bananas")
        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertEqual(new_ad.category, "Fruit")