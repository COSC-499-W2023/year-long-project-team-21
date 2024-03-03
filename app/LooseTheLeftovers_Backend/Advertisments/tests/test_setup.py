import PIL, os
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile

from Advertisments.models import Advertisment, AdvertismentImage
from Users.models import CustomUser

class TestSetUpCreateAdvertisment(APITestCase):

    def setUp(self):

        # create test user
        self.username = "test_user"
        self.password = "123"
        self.user = CustomUser.objects.create_user(
            username=self.username,
            password=self.password
        )
        self.user.save()
        
        # get token for user
        token = RefreshToken.for_user(self.user)
        self.token = str(token.access_token)
        self.refresh = str(token)

        # create temp ad image
        self.image_path = 'test.png'
        self.image = PIL.Image.new('RGB', (200, 200), color='blue')
        self.image.save(self.image_path)
        self.image_file = SimpleUploadedFile(
            name='test.png',
            content=open(self.image_path, 'rb').read(),
            content_type='image/png'
        )

        # set valid json data to create an ad and associated image
        self.valid_data = {
            'title': "Bananas",
            'description': "Three Bananas",
            'category': "Fruit",
            'expiry': "2023-12-25T12:30:00.000000Z",
            'latitude': 49.8875083,
            'longitude': -119.496064,
            'image': self.image_file
        }

        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        os.remove(self.image_path)
        for file in os.listdir('media/images'):
            if file.startswith('test'):
                os.remove(os.path.join('media/images', file))
        return super().tearDown()
    
class TestSetUpRetrieveAdvertisment(APITestCase):

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

        # create 5 test ads
        self.ad_1 = Advertisment.objects.create(
            user_id=1,
            title='Apples',
            description='Some apples',
            category= 'vegan',
            expiry='2024-01-25T12:30:00.000000Z',
            latitude=49.8875083,
            longitude=-119.496064

        )
        self.ad_2 = Advertisment.objects.create(
            user_id=1,
            title='Bananas',
            description='Some bananas',
            category='vegan',
            expiry="2024-03-25T12:30:00.000000Z"
        )
        self.ad_3 = Advertisment.objects.create(
            user_id=1,
            title='Pasta',
            description='Vegetarian pasta',
            category='Vegetarian',
            expiry='2024-01-25T12:30:00.000000Z',
        )
        self.ad_4 = Advertisment.objects.create(
            user_id=2,
            title='Pizza',
            description='Pepperoni',
            category='None',
        )
        self.ad_5 = Advertisment.objects.create(
            user_id=2,
            title='Take out',
            description='Some leftovers',
            category='Unknown',
        )

        # create 5 test AdvertismentImages
        self.image_1 = AdvertismentImage.objects.create(
            ad_id=self.ad_1,
            image='app/LooseTheLeftovers_Backend/media/images/12345.PNG'
        )
        self.image_2 = AdvertismentImage.objects.create(
            ad_id=self.ad_2,
            image='app/LooseTheLeftovers_Backend/media/images/12345.PNG'
        )
        self.image_3 = AdvertismentImage.objects.create(
            ad_id=self.ad_3,
            image='app/LooseTheLeftovers_Backend/media/images/12345.PNG'
        )
        self.image_4 = AdvertismentImage.objects.create(
            ad_id=self.ad_4,
            image='app/LooseTheLeftovers_Backend/media/images/12345.PNG'
        )
        self.image_5 = AdvertismentImage.objects.create(
            ad_id=self.ad_5,
            image='app/LooseTheLeftovers_Backend/media/images/12345.PNG'
        )

    def tearDown(self):
        return super().tearDown()