from rest_framework import serializers

from Messages.models import Message

class MessageSerializer(serializers.Serializer):
    """
    Serializer to validate data fields for the Message model.

    When an instance of this class is initialized it has to be passed the request data
    as a parameter. After it is initialized .is_valid() should be called to validate the data.

    If .is_valid() returns false, the .errors property will be populated showing which fields
    could not be validated.

    If .is_valid() returns true, the .validated_data property will be populated and the .save()
    method can be called to save an instance of an Message in the database.
    """

    msg = serializers.CharField(max_length=1000)
    receiver_id = serializers.IntegerField()
    ad_id = serializers.IntegerField()

    def create(self, validated_data):
        """
        Create method executes when AdvertismentSerializer.save() is called in advertisements/api/views.py.
        Will save an instance of the Advertisment in the database.

        Returns an instance of the Advertisment that was saved.
        """
        sender = self.context["request"].user.id
        ad = Message.objects.create(sender_id=sender, **validated_data)
        return ad

class GetMessageSerializer(serializers.Serializer):
    msg = serializers.CharField(max_length=1000)
    sender_id = serializers.IntegerField()
    receiver_id = serializers.IntegerField()
    ad_id = serializers.IntegerField()
    time_sent = serializers.DateTimeField()