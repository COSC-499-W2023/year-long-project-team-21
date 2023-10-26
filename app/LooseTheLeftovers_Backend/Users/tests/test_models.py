from .test_setup import TestSetUpCreateAccount
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

"""
class TestModels(TestSetUpCreateAccount):
    def test_token_creation(self):
        # get user id from test_user
        user_id = User.objects.get(username=self.test_user).id
        # query authtoken_token to see if token exists for user
        token = Token.objects.get(user_id=user_id)
"""
