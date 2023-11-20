from rest_framework.test import APITestCase
from Messages.models import Message

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
