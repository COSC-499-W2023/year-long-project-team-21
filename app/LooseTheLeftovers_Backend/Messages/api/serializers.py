from rest_framework import serializers

from Advertisments.models import Advertisment
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

    def create(self, validated_data):
        """
        Create method executes when MessageSerializer.save() is called in messages/api/views.py.
        Will save an instance of the Message in the database.

        Returns an instance of the Message that was saved.
        """
        sender = self.context["request"].user.id
        ad = self.context["ad"]
        msg = Message.objects.create(sender_id=sender, ad_id=ad, **validated_data)
        return msg

class GetMessageSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(queryset=Message.objects.all())
    msg = serializers.CharField(max_length=1000)
    sender_id = serializers.IntegerField()
    receiver_id = serializers.IntegerField()
    time_sent = serializers.DateTimeField()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['username'] = self.context['username']

        return representation

class LastMessageSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    username = serializers.CharField()
    msg = serializers.CharField(max_length=1000)
    ad_id = serializers.IntegerField()
    time_sent = serializers.DateTimeField()