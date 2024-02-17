import os
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from Messages.models import Message
from Users.models import CustomUser
from Advertisments.models import Advertisment

class TestSetUpCreateMessage(APITestCase):
    def setUp(self):

        # create temp msg
        self.test_msg = Message.objects.create(
            msg="test msg",
            sender_id = 1,
            receiver_id = 2,
            ad_id = 1
        )
        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        self.test_msg.delete()
        return super().tearDown()
    
class TestSetUpGetMessage(APITestCase):
    def setUp(self):

         # create 2 test users
        self.username_1 = "user_1"
        self.password_2 = "123"
        self.user_1 = CustomUser.objects.create_user(
            username=self.username_1,
            password=self.password_2
        )
        self.user_1.save()

        self.username_1 = "user_2"
        self.password_2 = "456"
        self.user_2 = CustomUser.objects.create_user(
            username=self.username_1,
            password=self.password_2
        )
        self.user_2.save()

        # get token for user_1
        token = RefreshToken.for_user(self.user_1)
        self.token = str(token.access_token)
        self.refresh = str(token)

        # create 1 test ad
        self.ad = Advertisment.objects.create(
            user_id=self.user_1.id,
            title='Bananas',
            description='Some bananas',
            category='vegan',
            expiry="2024-02-25T12:30:00.000000Z"
        )

        # create messages for test conversation
        self.message_1 = Message.objects.create(
            msg="Hey!",
            sender_id=self.user_1.id,
            receiver_id=self.user_2.id,
            time_sent="2024-02-10T12:30:00.000000Z",
            ad_id = self.ad.id
        )
        self.message_2 = Message.objects.create(
            msg="Wanted to ask about the bananas. They still available?",
            sender_id=self.user_1.id,
            receiver_id=self.user_2.id,
            time_sent="2024-02-10T12:30:05.000000Z",
            ad_id = self.ad.id
        )
        self.message_3 = Message.objects.create(
            msg="Hello, yes they are",
            sender_id=self.user_2.id,
            receiver_id=self.user_1.id,
            time_sent="2024-02-10T12:45:10.000000Z",
            ad_id = self.ad.id
        )
        self.message_4 = Message.objects.create(
            msg="When can you pick them up",
            sender_id=self.user_2.id,
            receiver_id=self.user_1.id,
            time_sent="2024-02-10T12:45:20.000000Z",
            ad_id = self.ad.id
        )
        self.message_5 = Message.objects.create(
            msg="Does tomorrow afternoon work? Maybe 3pm?",
            sender_id=self.user_1.id,
            receiver_id=self.user_2.id,
            time_sent="2024-02-10T20:39:00.000000Z",
            ad_id = self.ad.id
        )
        self.message_6 = Message.objects.create(
            msg="Ok sounds good",
            sender_id=self.user_2.id,
            receiver_id=self.user_1.id,
            time_sent="2024-02-11T07:20:00.000000Z",
            ad_id = self.ad.id
        )
        self.message_7 = Message.objects.create(
            msg="My address is 123 1st Street",
            sender_id=self.user_2.id,
            receiver_id=self.user_1.id,
            time_sent="2024-02-10T07:21:00.000000Z",
            ad_id = self.ad.id
        )

        # call APITestCase.setUp()
        return super().setUp()