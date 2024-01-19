from .test_setup import TestSetUpCreateAdvertisment
from Advertisments.models import Advertisment

class TestModels(TestSetUpCreateAdvertisment):
    def test_create_ad(self):
        """
        Test if instance of advertisment model can be created in database
        """
        # create new ad
        Advertisment.objects.create(
            user_id = 1,
            title = 'Test Ad',
            description = 'Description for test ad',
            category = 'Vegan',
            expiry  = '2023-12-25T12:30:00.000000Z',
        )

        # assert ad exists
        new_ad = Advertisment.objects.get(title="Test Ad")
        self.assertEqual(new_ad.description, 'Description for test ad')