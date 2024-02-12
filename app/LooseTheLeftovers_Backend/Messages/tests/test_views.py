from django.urls import reverse
from rest_framework import status

from .test_setup import TestSetUpGetMessage
from Messages.models import Message
from rest_framework.test import APIClient, APITestCase

class TestRetrieveMessages(TestSetUpGetMessage):

    __message_url = reverse("get-messages")

    def test_get_messages(self):
        '''
        test to see if messages can be retrieved via GET request.
        Expect 200 response and 7 messages in the response
        '''
        data = {
            'user_id': self.user_2.id,
            'ad_id': self.ad.id,
        }

        client = APIClient()
        response = client.get(
            self.__message_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 7 messages in the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 7)
    
    def test_get_messages_no_athentication(self):
        '''
        test to see if messages can be retrieved via GET request without being logged in
        (not logged in means no access token included in request)
        '''
        data = {
            'user_id': self.user_2.id,
            'ad_id': self.ad.id,
        }

        client = APIClient()
        response = client.get(
            self.__message_url,
            data,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_messages_empty_response(self):
        '''
        test to see if messages can be retrieved via GET request, but the request is
        for messages that do not exist. Expect 204 response
        '''
        data = {
            'user_id': self.user_2.id,
            'ad_id': 999,
        }

        client = APIClient()
        response = client.get(
            self.__message_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 7 messages in the response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)