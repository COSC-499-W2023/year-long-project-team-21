from datetime import date, timedelta
from Advertisments.models import Advertisment, AdvertismentImage
from django.db.models.fields.files import ImageFieldFile
from .test_setup import TestSetUpCreateAdvertisment, TestSetUpRetrieveAdvertisment
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from Advertisments.api.views import get_expiry_formatted
from Advertisments.cron import delete_expired_ads

class TestCreateAd(TestSetUpCreateAdvertisment):

    __ad_url = reverse("create-ad")

    def test_post_new_ad(self):
        """
        Test if ad can be created via POST request
        """
        client = APIClient()

        # post request and assert valid response
        response = client.post(
            self.__ad_url,
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
            self.__ad_url,
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
            self.__ad_url,
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
            self.__ad_url,
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
            self.__ad_url,
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

    def test_create_ad_with_put_request(self):
        """
        Test if ad can be created via PUT request. Expect HTTP_405_METHOD_NOT_ALLOWED response
        """
        client = APIClient()

        # post request and assert valid response
        response = client.put(
            self.__ad_url,
            self.valid_data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

class TestRetrieveAds(TestSetUpRetrieveAdvertisment):

    def test_get_single_ad(self):
        """
        Test if single ad can be retrieved via GET request. Expect HTTP_200_OK response and the ad
        data and image url returned as json
        """
        client = APIClient()

        # specific user id to get all ads for
        # this may have to be modified (also in assert statement) as more tests are added.
        # a correct primary key to use depends on how many tests run before this one
        specific_ad_id = 30

        # create get request using kwargs
        specific_ad_url = reverse(
            "specific-ad", 
            kwargs={"ad_id": specific_ad_id}
        )

        # send request
        response = client.get(specific_ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert ad matching primary key is returned
        self.assertEqual(response.data['id'], 30)

        # assert path to image is included
        self.assertEqual(response.data['image'], '/media/app/LooseTheLeftovers_Backend/media/images/12345.PNG')

        # assert expiry in correct format is included
        self.assertEqual(response.data['expiry'], '2 weeks')

    def test_get_users_ads(self):
        """
        Test if all ads created by a user can be retrieved with GET request. 
        Expect HTTP_200_OK response and 3 ads returned as json (only 3 due to pagination)
        """
        client = APIClient()

        # specific user id to get all ads for
        specific_user_id = 1

        # create get request using kwargs
        user_ad_url = reverse(
            "user-ads", 
            kwargs={"user_id": specific_user_id}
        )

        # send request
        response = client.get(
            user_ad_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert 3 ads returned 
        self.assertEqual(len(response.data), 3)

    def test_get_users_ads_last_page(self):
        """
        Test if ads created by a user can be retrieved after the final page of ads with GET request. 
        Expect HTTP_204_NO_CONTENT response
        """
        client = APIClient()

        # specific user id to get all ads for
        specific_user_id = 1

        # create get request using kwargs
        user_ad_url = reverse(
            "user-ads", 
            kwargs={"user_id": specific_user_id}
        ) + "?page=2"

        # send request
        response = client.get(
            user_ad_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_users_ads_no_authentication(self):
        """
        Test if users ads can be retrieved with GET request without valid token. Expect 401_unauthorized
        """
        client = APIClient()

        # specific user id to get all ads for
        specific_user_id = 1

        # create get request using kwargs
        user_ad_url = reverse(
            "user-ads", 
            kwargs={"user_id": specific_user_id}
        )

        # send request
        response = client.get(user_ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_all_ads_first_page(self):
        """
        Test if all ads can be retrieved via GET request. Expect HTTP_200_OK response and three ads
        returned as json (only 3 because of pagination)
        """
        client = APIClient()

        # create get request using kwargs
        ad_url = reverse("all-ads")

        # send request
        response = client.get(ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert 3 ads returned (max 3 per page)
        self.assertEqual(len(response.data), 3)

    def test_get_all_ads_second_page(self):
        """
        Test if the second page of ads can be retrieved with a GET request.
        5 ads in total are created in test setup and 3 are returned per page. 
        The second page should therefore have 2 ads on it
        """
        client = APIClient()

        # create get request using kwargs
        ad_url = reverse("all-ads") + "?page=2"

        # send request
        response = client.get(ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert 2 ads returned
        self.assertEqual(len(response.data), 2)
    
    def test_get_all_ads_page_out_of_bounds(self):
        """
        Test if page after final page of ads can be retrieved with a GET request.
        5 ads in total are created in test setup and 3 are returned per page, so the 
        third page will not exist.

        Expect a 204 no content response
        """
        client = APIClient()

        # create get request using kwargs
        ad_url = reverse("all-ads") + "?page=3"
        response = client.get(ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # try again with larger page number, should be same result
        ad_url = reverse("all-ads") + "?page=8"
        response = client.get(ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_ad_that_does_not_exist(self):
        """
        Test if single ad can be retrieved via GET request but using a primary key that does not exist.
        Expect 204 no content response
        """
        client = APIClient()

        # specific ad id that does not exist
        specific_ad_id = 100

        # create get request using kwargs
        specific_ad_url = reverse(
            "specific-ad", 
            kwargs={"ad_id": specific_ad_id}
        )

        # send request
        response = client.get(specific_ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_expired_ads(self):
        '''
        Test that the function that deletes expired ads is deleting them correctly.
        Test setup ads 5 total ads of which 2 have expired dates, therefore there should be
        3 left after the expired ones are deleted.
        '''
        # assert there are 5 ads (and images) before function call
        all_ads = Advertisment.objects.all()
        all_images = AdvertismentImage.objects.all()
        self.assertEqual(len(all_ads), 5)
        self.assertEqual(len(all_images), 5)

        # call function; currently set to return the number of ads deleted
        number_deleted_ads = delete_expired_ads()
        self.assertEqual(number_deleted_ads, 2)

        # assert there are now 3 ads (and images) left in the database
        all_ads = Advertisment.objects.all()
        all_images = AdvertismentImage.objects.all()
        self.assertEqual(len(all_ads), 3)
        self.assertEqual(len(all_images), 3)

class ExpiryDateTests(APITestCase):

    def test_short_expiry(self):
        '''
        Test the expiry returned if ad expires tomorrow.
        Expect '1 days'
        '''
        expiry = date.today() + timedelta(days=1)
        result = get_expiry_formatted(expiry)

        self.assertEqual(result['expiry'], '1 day')

    def test_medium_expiry(self):
        '''
        Test the expiry returned if ad expires in a week.
        Expect '1 week'
        '''
        expiry = date.today() + timedelta(days=7)
        result = get_expiry_formatted(expiry)

        self.assertEqual(result['expiry'], '1 week')

    def test_long_expiry(self):
        '''
        Test the expiry returned if ad expires in two weeks.
        Expect '2 weeks'
        '''
        expiry = date.today() + timedelta(days=14)
        result = get_expiry_formatted(expiry)

        self.assertEqual(result['expiry'], '2 weeks')

    def test_no_expiry(self):
        '''
        Test the expiry returned if ad has no expiry set.
        Expect '2 weeks' (no expiry will forever show two weeks)
        '''
        expiry = None
        result = get_expiry_formatted(expiry)

        self.assertEqual(result['expiry'], '2 weeks')