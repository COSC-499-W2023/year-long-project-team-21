from rest_framework import serializers
from Advertisments.models import Advertisment, AdvertismentImage

class AdvertismentSerializer(serializers.Serializer):
    '''
    Serializer to validate data fields for the Advertisment model.

    When an instance of this class is initialized it has to be passed the request data
    as a parameter. After it is initialized .is_valid() should be called to validate the data.

    If .is_valid() returns false, the .errors property will be populated showing which fields
    could not be validated.

    If .is_valid() returns true, the .validated_data property will be populated and the .save() 
    method can be called to save an instance of an Advertisment in the database.
    '''
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000, required=False)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)
    longitude = serializers.FloatField(required=False)
    latitude = serializers.FloatField(required=False)
    
    def create(self, validated_data):
        '''
        Create method executes when AdvertismentSerializer.save() is called in advertisements/api/views.py. 
        Will save an instance of the Advertisment in the database.

        Returns an instance of the Advertisment that was saved.
        '''
        user = self.context['request'].user
        ad = Advertisment.objects.create(
            user_id=user.id, 
            **validated_data
        )
        return ad

class ImageSerializer(serializers.Serializer):
    '''
    Serializer to validate data fields for the AdvertismentImage model.

    When an instance of this class is initialized it has to be passed the request files
    as a parameter. After it is initialized .is_valid() should be called to validate that
    the image passed is valid.
    
    If .is_valid() returns false, the .errors property will be populated.

    If .is_valid() returns true, the .validated_data property will be populated and the .save() 
    method can be called to save an instance of an AdvertismentImage in the database.
    '''
    image = serializers.ImageField()
    
    def create(self, validated_data):
        '''
        Create method executes when ImageSerializer.save() is called. Will save an instance
        of the AdvertismentImage in the database.

        Returns an instance of the AdvertismentImage that was saved.
        '''
        ad = self.context['ad']
        image = AdvertismentImage.objects.create(
            ad_id=ad, 
            **validated_data
        )
        return image
    
class ReturnAdvertismentSerializer(serializers.Serializer):
    '''
    Serializer to serialize data when retrieving ads from the database. 
    This serializer will also return the primary key when an ad is retrieved.
    '''
    id = serializers.PrimaryKeyRelatedField(queryset=Advertisment.objects.all())
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000, required=False)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)

class ReturnAdvertismentNoDescriptionSerializer(serializers.Serializer):
    '''
    Serializer to serialize data when retrieving ads from the database. 
    This serializer will also return the primary key when an ad is retrieved.
    '''
    id = serializers.PrimaryKeyRelatedField(queryset=Advertisment.objects.all())
    title = serializers.CharField(max_length=50)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)