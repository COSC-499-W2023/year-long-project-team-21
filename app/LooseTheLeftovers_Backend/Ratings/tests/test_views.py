from django.urls import reverse
from rest_framework import status

from .test_setup import TestSetUpRatings
from Ratings.models import Rating
from rest_framework.test import APIClient

class TestCreateRatings(TestSetUpRatings):

    __rating_url = reverse("post-ratings")

    def test_create_rating(self):
        '''
        test to see if rating can be send via POST request.
        Expect 201 response
        '''  
        client = APIClient()
        data = {
            'receiver_id': self.user_2.id,
            'rating': 2
        }

        # post request and assert valid response
        response = client.post(
            self.__rating_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_send_message_no_athentication(self):
        '''
        test to see if rating can be created via POST request but without authentication 
        Expect 401 response
        '''  
        client = APIClient()
        data = {
            'receiver_id': self.user_2.id,
            'rating': 2
        }

        # post request and assert valid response
        response = client.post(
            self.__rating_url,
            data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_send_message_invalid_data(self):
        '''
        test to see if ratings can be send via POST request but with invalid json data
        (missing field) in request header. Expect 400 response
        '''  
        client = APIClient()
        data = {
            'receiver_id': self.user_2.id,
        }

        # post request and assert valid response
        response = client.post(
            self.__rating_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class TestRetrieveRatings(TestSetUpRatings):

    def test_get_rating(self):
        '''
        test to see if rating can be retrieved via GET request.
        Expect 200 response and rating to returned to be 3 (int(2+4+5))
        '''
        get_message_url = reverse(
            "get-ratings", 
            kwargs={'user_id': self.user_4.id,}
        )

        client = APIClient()
        response = client.get(
            get_message_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 6 messages in the response
        #   (pagination only returns up to 6 items)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rating'], 3)

    def test_get_ratings_no_athentication(self):
        '''
        test to see if rating can be retrieved via GET request without being logged in
        (not logged in means no access token included in request)
        '''
        get_message_url = reverse(
            "get-ratings", 
            kwargs={'user_id': self.user_4.id,}
        )

        client = APIClient()
        response = client.get(
            get_message_url,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_ratings_empty_response(self):
        '''
        test to see if rating can be retrieved via GET request, but the request is
        for a user that do not exist. Expect 204 response
        '''
        get_message_url = reverse(
            "get-ratings", 
            kwargs={'user_id': 999}
        )

        client = APIClient()
        response = client.get(
            get_message_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 7 messages in the response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    