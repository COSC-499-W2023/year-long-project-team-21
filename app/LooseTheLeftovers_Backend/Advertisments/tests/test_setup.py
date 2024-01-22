import PIL, os
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile

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
            'image': self.image_file
        }

        # call APITestCase.setUp()
        return super().setUp()

    def tearDown(self):
        os.remove(self.image_path)
        return super().tearDown()
