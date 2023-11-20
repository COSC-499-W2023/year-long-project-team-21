from Advertisments.models import Advertisment
from .test_setup import TestSetUpCreateAdvertisment

class TestModels(TestSetUpCreateAdvertisment):

    def test_create_new_ad(self):
        """
        Test if created test ad exists in database
        """
        ad = Advertisment.objects.get(pk=1)
        self.assertEqual(ad.title, "Test Ad")
        self.assertEqual(ad.description, "test")
