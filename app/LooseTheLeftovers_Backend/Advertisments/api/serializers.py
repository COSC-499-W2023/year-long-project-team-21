from rest_framework import serializers
from Advertisments.models import Advertisment, AdvertismentImage
from datetime import date, datetime


class AdvertismentSerializer(serializers.Serializer):
    """
    Serializer to validate data fields for the Advertisment model.

    When an instance of this class is initialized it has to be passed the request data
    as a parameter. After it is initialized .is_valid() should be called to validate the data.

    If .is_valid() returns false, the .errors property will be populated showing which fields
    could not be validated.

    If .is_valid() returns true, the .validated_data property will be populated and the .save()
    method can be called to save an instance of an Advertisment in the database.
    """

    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000, required=False)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)
    longitude = serializers.FloatField(required=False)
    latitude = serializers.FloatField(required=False)

    def create(self, validated_data):
        """
        create method executes when AdvertismentSerializer.save() is called in advertisements/api/views.py
        and there is NOT an instance of an existing ad included.

        Will save an instance of the new Advertisment in the database.

        Returns an instance of the Advertisment that was saved.
        """
        user = self.context["request"].user
        ad = Advertisment.objects.create(user_id=user.id, **validated_data)
        return ad
    
    def update(self, instance, validated_data):
        """
        update method executes when AdvertismentSerializer.save() is called in advertisements/api/views.py
        and an instance of an existing ad is included.

        Will save an updated instance of the Advertisment in the database.

        Returns an instance of the Advertisment that was saved.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.category = validated_data.get('category', instance.category)
        instance.expiry = validated_data.get('expiry', instance.expiry)
        instance.save()
        return instance


class ImageSerializer(serializers.Serializer):
    """
    Serializer to validate data fields for the AdvertismentImage model.

    When an instance of this class is initialized it has to be passed the request files
    as a parameter. After it is initialized .is_valid() should be called to validate that
    the image passed is valid.

    If .is_valid() returns false, the .errors property will be populated.

    If .is_valid() returns true, the .validated_data property will be populated and the .save()
    method can be called to save an instance of an AdvertismentImage in the database.
    """

    image = serializers.ImageField()

    def create(self, validated_data):
        """
        Create method executes when ImageSerializer.save() is called. Will save an instance
        of the AdvertismentImage in the database.

        Returns an instance of the AdvertismentImage that was saved.
        """
        ad = self.context["ad"]
        image = AdvertismentImage.objects.create(ad_id=ad, **validated_data)
        return image


class ReturnAdvertismentSerializer(serializers.Serializer):
    """
    Serializer to serialize data when retrieving ads from the database.
    This serializer will also return the primary key when an ad is retrieved.
    """
    id = serializers.PrimaryKeyRelatedField(queryset=Advertisment.objects.all())
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000, required=False)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)

    def to_representation(self, instance):
        """
        Convert `expiry` date format to the desired format when serializing.
        """
        ret = super().to_representation(instance)
        expiry_formatted = self.get_expiry_formatted(ret["expiry"])
        ret.update(expiry_formatted)
        return ret

    def get_expiry_formatted(self, expiry):
        """
        returns dict with two items: color and expiry. Both items are formatted to how front end needs them.
        To be passed the expiry of the ad as datetime or None
        """

        # if expiry is blank default to show as 2 weeks
        if expiry is None:
            return {"color": "expiry_long", "expiry": "2 weeks"}

        # if expiry was passed as a string, cast it to a date object
        if type(expiry) is str:
            if len(expiry) > 20:
                expiry = datetime.strptime(expiry, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            else:
                expiry = datetime.strptime(expiry, "%Y-%m-%dT%H:%M:%SZ").date()

        today = date.today()
        delta = expiry - today
        # >9 days will show as 2 weeks (long color)
        if delta.days > 9:
            return {"color": "expiry_long", "expiry": "2 weeks"}
        # >6 days will show as 1 week (mid color)
        elif delta.days > 6:
            return {"color": "expiry_mid", "expiry": "1 week"}
        # 1 day or less will show as 1 day (short color)
        elif delta.days <= 1:
            return {"color": "expiry_short", "expiry": "1 day"}
        # 1 to 6 days will show as 'n' days (short color)
        else:
            return {"color": "expiry_short", "expiry": str(delta.days) + " days"}