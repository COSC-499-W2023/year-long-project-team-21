from datetime import date, timedelta
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.fields.files import ImageFieldFile
from .test_setup import (
    TestSetUpCreateAdvertisment,
    TestSetUpRetrieveAdvertisment,
    TestSetupLocationAds,
)
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .test_setup import TestSetUpCreateAdvertisment, TestSetUpRetrieveAdvertisment
from Advertisments.models import Advertisment, AdvertismentImage
from Advertisments.api.serializers import ReturnAdvertismentSerializer
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
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert new ad and associated image exists in database
        new_ad = Advertisment.objects.get(title="Bananas")
        new_ad_image = AdvertismentImage.objects.get(ad_id=new_ad)

        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertIsInstance(new_ad_image.image, ImageFieldFile)

    def test_post_new_ad_no_authentication(self):
        """
        Test POST request to create-ad with invalid token. Expect 401_unauthorized
        """
        client = APIClient()

        # post request with invalid token
        response = client.post(
            self.__ad_url,
            self.valid_data,
            HTTP_AUTHORIZATION="Bearer " + "this_is_not_a_valid_token",
            format="multipart",
        )

        # assert 401_unauthorized response
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_new_ad_missing_title(self):
        """
        Test POST request to create-ad with missing required title field. Expect 400_bad_request
        """
        client = APIClient()
        data = {
            "description": "Three Bananas",
            "category": "Fruit",
            "expiry": "2023-12-25T12:30:00.000000Z",
            "image": self.image_file,
        }

        # post request and assert valid response
        response = client.post(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_new_ad_invalid_date(self):
        """
        Test POST request to create-ad with invalid date format in body. Expect 400_bad_request
        """
        client = APIClient()
        # create data with no title
        data = {
            "title": "Bananas",
            "description": "Three Bananas",
            "category": "Fruit",
            "expiry": "12/25/2023",
        }

        # post request and assert valid response
        response = client.post(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_new_ad_empty_date(self):
        """
        Test POST request to create-ad without expiry date provided (expiry is allowed to be null)
        """
        client = APIClient()
        data = {
            "title": "Bananas",
            "description": "Three Bananas",
            "category": "Fruit",
            "image": self.image_file,
        }

        # post request and assert valid response
        response = client.post(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert new ad and associated image exists in database
        new_ad = Advertisment.objects.get(title="Bananas")
        new_ad_image = AdvertismentImage.objects.get(ad_id=new_ad)

        self.assertEqual(new_ad.description, "Three Bananas")
        self.assertIsInstance(new_ad_image.image, ImageFieldFile)


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
        specific_ad_id = self.ad_2.id

        # create get request using kwargs
        specific_ad_url = reverse("specific-ad", kwargs={"ad_id": specific_ad_id})

        # send request
        response = client.get(specific_ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert ad matching primary key is returned
        self.assertEqual(response.data["id"], self.ad_2.id)

        # assert path to image is included
        self.assertEqual(
            response.data["image"],
            "/media/app/LooseTheLeftovers_Backend/media/images/12345.PNG",
        )

        # assert expiry in correct format is included
        self.assertEqual(response.data["expiry"], "1 week")

    def test_get_users_ads(self):
        """
        Test if all ads created by a user can be retrieved with GET request.
        Expect HTTP_200_OK response and 3 ads returned as json (only 3 due to pagination)
        """
        client = APIClient()

        # specific user id to get all ads for
        specific_user_id = self.user_1.id

        # create get request using kwargs
        user_ad_url = reverse("user-ads", kwargs={"user_id": specific_user_id})

        # send request
        response = client.get(
            user_ad_url,
            HTTP_AUTHORIZATION="Bearer " + self.token,
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
        user_ad_url = (
            reverse("user-ads", kwargs={"user_id": specific_user_id}) + "?page=2"
        )

        # send request
        response = client.get(
            user_ad_url,
            HTTP_AUTHORIZATION="Bearer " + self.token,
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
        user_ad_url = reverse("user-ads", kwargs={"user_id": specific_user_id})

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
        6 ads in total (but 2 expired) are created in test setup and 3 are returned 
        per page. The second page should therefore have 1 ad on it
        """
        client = APIClient()

        # create get request using kwargs
        ad_url = reverse("all-ads") + "?page=2"

        # send request
        response = client.get(ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert 1 ad returned
        self.assertEqual(len(response.data), 1)

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
        specific_ad_url = reverse("specific-ad", kwargs={"ad_id": specific_ad_id})

        # send request
        response = client.get(specific_ad_url)

        # assert valid response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_expired_ads(self):
        """
        Test that the function that deletes expired ads is deleting them correctly.
        Test setup ads 5 total ads of which 2 have expired dates, therefore there should be
        3 left after the expired ones are deleted.
        """
        # assert there are 5 ads (and images) before function call
        all_ads = Advertisment.objects.all()
        all_images = AdvertismentImage.objects.all()
        self.assertEqual(len(all_ads), 6)
        self.assertEqual(len(all_images), 6)

        # call function; currently set to return the number of ads deleted
        number_deleted_ads = delete_expired_ads()
        self.assertEqual(number_deleted_ads, 2)

        # assert there are now 3 ads (and images) left in the database
        all_ads = Advertisment.objects.all()
        all_images = AdvertismentImage.objects.all()
        self.assertEqual(len(all_ads), 4)
        self.assertEqual(len(all_images), 4)

    def get_ads_categories(self):

        # ********************************** testing no categories **********************************

        client = APIClient()

        # create get request using kwargs
        # ads_categories = reverse("categories", kwargs={"ad_id": specific_ad_id})

        ads_categories = reverse("category-ads")

        # send request
        response = client.get(ads_categories)

        # Since the URL did not include parameters, an error is expected
        self.assertEqual(response.status_code, 400)

        # ********************************** testing no page **********************************

        ## adding categories, but no pages
        ads_categories_no_page = ads_categories + "?key1=peanut-free"

        response = client.get(ads_categories_no_page)

        self.assertEqual(response.status_code, 400)

        # ********************************** testing categories **********************************

        # categories but with a page
        ads_categories_peanut = ads_categories + "?page=1&key1=peanut-free"

        response = client.get(ads_categories_peanut)

        payload = response.data

        self.assertEqual(len(payload), 1)

        ads_categories_vegan = ads_categories + "?page=1&key1=vegan"

        response = client.get(ads_categories_vegan)

        payload = response.data

        self.assertEqual(len(payload), 2)

        ads_categories_gluten_free = ads_categories + "?page=1&key1=gluten-free"

        response = client.get(ads_categories_gluten_free)

        payload = response.data

        self.assertEqual(len(payload), 1)


class TestUpdateAds(TestSetUpRetrieveAdvertisment):

    __ad_url = reverse("create-ad")

    def test_update_ad(self):
        """
        Test if ad can be updated via PUT request
        """
        client = APIClient()
        data = {
            "ad_id": self.ad_1.id,
            "title": "Updated title",
            "description": self.ad_1.description,
            "category": "Fruit",
            "expiry": self.ad_1.expiry,
            "latitude": -119.397873,
            "longitude": 50.088470,
        }
        # post request and assert valid response
        response = client.put(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="json",
        )

        # assert HTTP_200 response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # get updated ad and assert title was updated
        updated_ad = Advertisment.objects.get(pk=self.ad_1.id)
        self.assertEqual(updated_ad.title, "Updated title")

    def test_update_ad_no_authentication(self):
        """
        Test if ad can be updated via PUT request without
        providing authentication. Expect 401_Unauthorized
        """
        client = APIClient()
        data = {
            "ad_id": self.ad_1.id,
            "title": "Updated title",
            "description": self.ad_1.description,
            "category": self.ad_1.category,
            "expiry": self.ad_1.expiry,
            "latitude": -119.397873,
            "longitude": 50.088470,
        }

        # post request and assert valid response
        response = client.put(
            self.__ad_url,
            data,
            format="json",
        )

        # assert HTTP_401 response
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_ad_other_user(self):
        """
        Test if ad can be updated via PUT request but the requesting user is not
        the user that created to original ad. Expect 400_Bad_Request
        """
        client = APIClient()
        data = {
            "ad_id": self.ad_5.id,
            "title": "Updated title",
            "description": self.ad_1.description,
            "category": self.ad_1.category,
            "expiry": self.ad_1.expiry,
            "latitude": -119.397873,
            "longitude": 50.088470,
        }

        # post request and assert valid response
        response = client.put(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="json",
        )

        # assert HTTP_400 response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_ad(self):
        """
        Test if ad can be deleted via DELETE request.
        Expect HTTP_200 response and ad and its image to be deleted
        """
        client = APIClient()
        data = {
            "ad_id": self.ad_1.id,
        }

        # post request and assert valid response
        response = client.delete(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="json",
        )

        # assert HTTP_200 response
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # assert ad is deleted
        try:
            deleted_ad = Advertisment.objects.get(pk=self.ad_1.id)
        except ObjectDoesNotExist as e:
            self.assertTrue(True)

    def test_delete_ad_no_authentication(self):
        """
        Test if ad can be deleted via DELETE request.
        Expect HTTP_401 response and ad and its image to be deleted
        """
        client = APIClient()
        data = {
            "ad_id": self.ad_5.id,
        }

        # post request and assert valid response
        response = client.delete(
            self.__ad_url,
            data,
            format="json",
        )

        # assert HTTP_401 response
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_ad_other_user(self):
        """
        Test if ad can be deleted via DELETE request but requesting user is no the
        user that created the original ad. Expect HTTP_401 response
        """
        client = APIClient()
        data = {
            "ad_id": self.ad_5.id,
        }

        # post request and assert valid response
        response = client.delete(
            self.__ad_url,
            data,
            HTTP_AUTHORIZATION="Bearer " + self.token,
            format="json",
        )

        # assert HTTP_400 response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ExpiryDateTests(APITestCase):

    def test_short_expiry(self):
        """
        Test the expiry returned if ad expires tomorrow.
        Expect '1 days'
        """
        expiry = date.today() + timedelta(days=1)
        result = ReturnAdvertismentSerializer.get_expiry_formatted(
            ReturnAdvertismentSerializer(), expiry
        )

        self.assertEqual(result["expiry"], "1 day")

    def test_medium_expiry(self):
        """
        Test the expiry returned if ad expires in a week.
        Expect '1 week'
        """
        expiry = date.today() + timedelta(days=7)
        result = ReturnAdvertismentSerializer.get_expiry_formatted(
            ReturnAdvertismentSerializer(), expiry
        )

        self.assertEqual(result["expiry"], "1 week")

    def test_long_expiry(self):
        """
        Test the expiry returned if ad expires in two weeks.
        Expect '2 weeks'
        """
        expiry = date.today() + timedelta(days=14)
        result = ReturnAdvertismentSerializer.get_expiry_formatted(
            ReturnAdvertismentSerializer(), expiry
        )

        self.assertEqual(result["expiry"], "2 weeks")

    def test_no_expiry(self):
        """
        Test the expiry returned if ad has no expiry set.
        Expect '2 weeks' (no expiry will forever show two weeks)
        """
        expiry = None
        result = ReturnAdvertismentSerializer.get_expiry_formatted(
            ReturnAdvertismentSerializer(), expiry
        )

        self.assertEqual(result["expiry"], "2 weeks")


class TestRetrieveLocationAds(TestSetupLocationAds):

    def test_retrieve_ads_near_10km_lake_country(self):
        # creata client to make requests
        client = APIClient()

        # endpoint for request
        ad_url = reverse("location-ads")

        # test for 10km
        range = 10

        # body required
        body = {
            "longitude": self.lake_country_long,
            "latitude": self.lake_country_lat,
            "range": range,
        }

        response = client.post(ad_url, body, format="json")
        status_code = response.status_code
        data = response.data

        # there should be 3 responses
        self.assertEqual(len(data), 3)
        self.assertEqual(status_code, status.HTTP_200_OK)
