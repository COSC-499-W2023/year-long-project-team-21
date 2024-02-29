from Ratings.models import Rating
from .test_setup import TestSetUpRatings

class TestModels(TestSetUpRatings):

    def test_create_new_rating(self):
        """
        Test if created test rating exists in database
        """
        rating = Rating.objects.create(
            receiver_id=self.user_1.id,
            giver_id=self.user_2.id,
            rating=1
        )

        # assert msg exists
        new_rating = Rating.objects.get(pk=rating.id)
        self.assertEqual(new_rating.rating, 1)
