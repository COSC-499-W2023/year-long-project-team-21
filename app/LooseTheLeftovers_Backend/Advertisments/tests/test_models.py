from Advertisments.models import Advertisment
from .test_setup import TestSetUpCreateAdvertisment
from django.urls import reverse
from rest_framework import status
import datetime
from LooseTheLeftovers_Backend.settings import BASE_DIR


from rest_framework.test import APIClient

class TestModels(TestSetUpCreateAdvertisment):

    __create_ad_url = reverse("create-ad")

    def test_create_new_ad(self):
        """
        Test if created test ad in setup exists in database
        """
        ad = Advertisment.objects.get(pk=1)
        self.assertEqual(ad.title, "Test Ad")
        self.assertEqual(ad.description, "test")

    def test_post_new_ad(self):
        """
        Test if ad can be created via POST request
        """
        client = APIClient()
        data = {
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': "2023-12-25T12:30:00.000000Z"
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert new ad exists in database
        new_ad = Advertisment.objects.get(title="Bananas")
        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertEqual(new_ad.category, "Fruit")

    def test_post_new_ad_no_authentication(self):
        '''
        Test POST request to create-ad with invalid token. Expect 401_unauthorized
        '''
        client = APIClient()
        data = {
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': "2023-12-25T12:30:00.000000Z"
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + 'this_is_not_a_valid_token',
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_post_new_ad_missing_title(self):
        '''
        Test POST request to create-ad with missing required title field. Expect 400_bad_request
        '''
        client = APIClient()
        # create data with no title
        data = {
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': "2023-12-25T12:30:00.000000Z"
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_new_ad_invalid_date(self):
        '''
        Test POST request to create-ad with invalid date format in body. Expect 400_bad_request
        '''
        client = APIClient()
        # create data with no title
        data = {
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': "12/25/2023"
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_new_ad_empty_date(self):
        '''
        Test POST request to create-ad without expiry date provided (expiry is allowed to be null)
        '''
        client = APIClient()
        data = {
            'title': "Apples",
            'description': "Two Apples",
            'category': "Fruit",
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert new ad exists in database
        new_ad = Advertisment.objects.get(title="Apples")
        self.assertEqual(new_ad.description, "Two Apples")
        self.assertEqual(new_ad.category, "Fruit")