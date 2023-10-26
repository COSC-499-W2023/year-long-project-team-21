from django.urls import reverse
from rest_framework import status
from .test_setup import TestSetUp


# class used for testing views
class TestViews(TestSetUp):
    # get reference login_url using url name
    __login_url = reverse("token")

    def test_user_authentication_no_body(self):
        # post to the url without a body
        response = self.client.post(self.__login_url)
        # test
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_authentication_with_valid_account(self):
        # get the url using the name
        response = self.client.post(self.__login_url, self.test_account, format="json")
        print(response)
