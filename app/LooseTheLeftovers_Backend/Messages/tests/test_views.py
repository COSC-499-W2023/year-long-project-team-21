from django.urls import reverse
from rest_framework import status

from .test_setup import TestSetUpGetMessage, TestSetUpSendMessage
from Messages.models import Message
from rest_framework.test import APIClient

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

class TestRetrieveMessages(TestSetUpGetMessage):

    __message_url = reverse("messages")

    def test_get_messages(self):
        '''
        test to see if messages can be retrieved via GET request.
        Expect 200 response and 7 messages in the response
        '''
        data = {
            'ad_id': self.ad.id,
        }

        get_message_url = reverse(
            "conversation", 
            kwargs={"user_id": self.user_2.id}
        )

        client = APIClient()
        response = client.get(
            get_message_url,
            data,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 6 messages in the response
        #   (pagination only returns up to 6 items)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 6)

        # loop to check the messages are in order of time_sent
        isOrdered = True
        for i in range(2, len(response.data)):
            if response.data[i-1]['time_sent'] > response.data[i]['time_sent']:
                isOrdered = False
                break
        self.assertTrue(isOrdered)
    
    def test_get_messages_page_2(self):
        '''
        test to see if messages can be retrieved via GET request.
        Expect 200 response and 1 messages in the response
        '''

        # create GET url with parameters in header
        get_message_url = reverse(
            "conversation", 
            kwargs={"user_id": self.user_2.id}
        ) + '?ad_id=' + str(self.ad.id) + '&page=2'


        client = APIClient()
        response = client.get(
            get_message_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 1 message in the response
        # pagination returns up to 6 items. There are 7 ads so page 2
        # should only have 1
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_get_messages_page_3(self):
        '''
        test to see if messages can be retrieved via GET request.
        Expect 204 response as page is out of bounds
        '''

        # create GET url with parameters in header
        get_message_url = reverse(
            "conversation", 
            kwargs={"user_id": self.user_2.id}
        ) + '?ad_id=' + str(self.ad.id) + '&page=3'

        client = APIClient()
        response = client.get(
            get_message_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 6 messages in the response
        #   (pagination only returns up to 6 items)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

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
        get_message_url = reverse(
            "user-ads", 
            kwargs={"user_id": 999}
        ) + '?ad_id=' + str(self.ad.id) + '&page=3'

        client = APIClient()
        response = client.get(
            get_message_url,
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 7 messages in the response
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_get_last_msg_converations(self):
        '''
        test to see if the last message in each conversation can be retrieved
        '''

        client = APIClient()
        response = client.get(
            self.__message_url + '?ad_id=' + str(self.ad.id),
            HTTP_AUTHORIZATION='Bearer ' + self.token,
        )

        # assert 200 response returned and 1 messages in the response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        # assert msg of last message in test setup is correct
        self.assertEqual(response.data[0].get('username'), 'user_2')
        self.assertEqual(response.data[0].get('msg'), 'My address is 123 1st Street')