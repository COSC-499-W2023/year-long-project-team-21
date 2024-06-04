from rest_framework import serializers

from Ratings.models import Rating

class RatingSerializer(serializers.Serializer):
    """
    Serializer to validate data fields for the Rating model.

    When an instance of this class is initialized it has to be passed the request data
    as a parameter. After it is initialized .is_valid() should be called to validate the data.

    If .is_valid() returns false, the .errors property will be populated showing which fields
    could not be validated.

    If .is_valid() returns true, the .validated_data property will be populated and the .save()
    method can be called to save an instance of an Message in the database.
    """
    rating = serializers.FloatField()
    receiver_id = serializers.IntegerField()

    def create(self, validated_data):
        """
        Create method executes when RatingSerializer.save() is called in ratings/api/views.py.
        Will save an instance of the Rating in the database.

        Returns an instance of the Rating that was saved.
        """
        giver = self.context["request"].user.id
        rating = Rating.objects.create(giver_id=giver, **validated_data)
        return rating