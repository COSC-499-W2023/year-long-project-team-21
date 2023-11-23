from rest_framework.test import APITestCase
from Advertisments.models import Advertisment
import datetime

class TestSetUpCreateAdvertisment(APITestCase):
    def setUp(self):

        # create temp ad
        self.test_ad = Advertisment.objects.create(
            title="Test Ad",
            user_id = 1,
            description = "test",
            category = "Food",
            expiry = datetime.datetime(2023, 12, 12, 10, 30)
        )
        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        self.test_ad.delete()
        return super().tearDown()
