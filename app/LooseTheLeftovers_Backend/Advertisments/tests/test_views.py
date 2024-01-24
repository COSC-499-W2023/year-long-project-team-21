from Advertisments.models import Advertisment, AdvertismentImage
from django.db.models.fields.files import ImageFieldFile
from .test_setup import TestSetUpCreateAdvertisment
from django.urls import reverse
from rest_framework import status

from rest_framework.test import APIClient

class TestModels(TestSetUpCreateAdvertisment):

    __create_ad_url = reverse("create-ad")
    __get_ad_url = reverse("ads")

    def test_post_new_ad(self):
        """
        Test if ad can be created via POST request
        """
        client = APIClient()

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            self.valid_data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert new ad and associated image exists in database
        new_ad = Advertisment.objects.get(title="Bananas")
        new_ad_image = AdvertismentImage.objects.get(ad_id=new_ad)

        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertIsInstance(new_ad_image.image, ImageFieldFile)

    def test_post_new_ad_no_authentication(self):
        '''
        Test POST request to create-ad with invalid token. Expect 401_unauthorized
        '''
        client = APIClient()

        # post request with invalid token
        response = client.post(
            self.__create_ad_url,
            self.valid_data,
            HTTP_AUTHORIZATION='Bearer ' + 'this_is_not_a_valid_token',
            format="multipart",
        )

        # assert 401_unauthorized response
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_new_ad_missing_title(self):
        '''
        Test POST request to create-ad with missing required title field. Expect 400_bad_request
        '''
        client = APIClient()
        data = {
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': "2023-12-25T12:30:00.000000Z",
            'image': self.image_file
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="multipart",
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
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_new_ad_empty_date(self):
        '''
        Test POST request to create-ad without expiry date provided (expiry is allowed to be null)
        '''
        client = APIClient()
        data = {
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
            'image': self.image_file
        }

        # post request and assert valid response
        response = client.post(
            self.__create_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert new ad and associated image exists in database
        new_ad = Advertisment.objects.get(title="Bananas")
        new_ad_image = AdvertismentImage.objects.get(ad_id=new_ad)

        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertIsInstance(new_ad_image.image, ImageFieldFile)

    def test_create_ad_with_get_request(self):
        """
        Test if ad can be created via GET request. Expect HTTP_405_METHOD_NOT_ALLOWED response
        """
        client = APIClient()
        
        # post request and assert valid response
        response = client.get(
            self.__create_ad_url,
            self.valid_data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_ad_with_put_request(self):
        """
        Test if ad can be created via PUT request. Expect HTTP_405_METHOD_NOT_ALLOWED response
        """
        client = APIClient()

        # post request and assert valid response
        response = client.put(
            self.__create_ad_url,
            self.valid_data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_get_single_ad(self):
        """
        Test if single ad can be retrieved via GET request. Expect HTTP_200_OK response and the ad
        information in returned as json
        """
        # TODO: also needs to assert the ad image was returned
        client = APIClient()

        # get request and assert valid response
        data = {'ad_id': 1}
        response = client.get(
            self.__get_ad_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)