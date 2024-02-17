from django.urls import reverse
from rest_framework import status

from .test_setup import TestSetUpGetMessage, TestSetUpSendMessage
from Messages.models import Message
from rest_framework.test import APIClient, APITestCase

class TestRetrieveMessages(TestSetUpGetMessage):

    __message_url = reverse("messages")

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

        # loop to check the messages are in order of time_sent
        isOrdered = True
        for i in range(2, len(response.data)):
            if response.data[i-1]['time_sent'] > response.data[i]['time_sent']:
                isOrdered = False
                break
        self.assertTrue(isOrdered)

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
    
class TestSendMessages(TestSetUpSendMessage):

    __message_url = reverse("messages")

    def test_send_message(self):
        '''
        test to see if messages can be send via POST request.
        Expect 201 response
        '''  
        client = APIClient()
        data = {
            'msg': "Three Bananas",
            'receiver_id': self.user_2.id,
            'ad_id': self.ad.id,
        }

        # post request and assert valid response
        response = client.post(
            self.__message_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_send_messages_no_athentication(self):
        '''
        test to see if messages can be send via POST request but without authentication 
        included in request header. Expect 401 response
        '''  
        client = APIClient()
        data = {
            'msg': "Three Bananas",
            'receiver_id': self.user_2.id,
            'ad_id': self.ad.id,
        }

        # post request and assert valid response
        response = client.post(
            self.__message_url,
            data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_send_message_invalid_data(self):
        '''
        test to see if messages can be send via POST request but with invalid json data
        included in request header. Expect 400 response
        '''  
        client = APIClient()
        data = {
            'msg': "Three Bananas",
            'receiver_id': 100,
            'ad_id': 100,
        }

        # post request and assert valid response
        response = client.post(
            self.__message_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)