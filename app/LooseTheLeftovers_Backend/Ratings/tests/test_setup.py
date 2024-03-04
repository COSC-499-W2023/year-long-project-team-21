from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from Ratings.models import Rating
from Users.models import CustomUser

class TestSetUpRatings(APITestCase):
    def setUp(self):
        # create 1 user and log them in
        self.username_1 = "user_1"
        self.password = "123"
        self.user_1 = CustomUser.objects.create_user(
            username=self.username_1,
            password=self.password
        )
        self.user_1.save()

        # get token for user_1
        token = RefreshToken.for_user(self.user_1)
        self.token = str(token.access_token)
        self.refresh = str(token)

        # create 3 other users
        self.username_2 = "user_2"
        self.user_2 = CustomUser.objects.create_user(
            username=self.username_2,
            password=self.password
        )
        self.user_2.save()

        self.username_3 = "user_3"
        self.user_3 = CustomUser.objects.create_user(
            username=self.username_3,
            password=self.password
        )
        self.user_3.save()
        
        self.username_4 = "user_4"
        self.user_4 = CustomUser.objects.create_user(
            username=self.username_4,
            password=self.password
        )
        self.user_4.save()

        # create 3 ratings for user_4
        self.rating1 = Rating.objects.create(
            receiver_id=self.user_4.id,
            giver_id=self.user_1.id,
            rating=2
        )
        self.rating2 = Rating.objects.create(
            receiver_id=self.user_4.id,
            giver_id=self.user_2.id,
            rating=4
        )
        self.rating3 = Rating.objects.create(
            receiver_id=self.user_4.id,
            giver_id=self.user_3.id,
            rating=5
        )

        return super().setUp()
    
    def tearDown(self):
        return super().tearDown()