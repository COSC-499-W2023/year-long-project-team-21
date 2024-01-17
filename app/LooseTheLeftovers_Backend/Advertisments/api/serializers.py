from rest_framework import serializers
from Advertisments.models import Advertisment, AdvertismentImage

class AdvertismentSerializer(serializers.Serializer):
    '''
    Serializer to validate data fields for the Advertisment model.
    '''
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)
    
    def create(self, validated_data):
        '''
        Create method executes when AdvertismentSerializer.save() is called. Will save an instance
        of the Advertisment in the database
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
    '''
    image = serializers.ImageField()
    
    def create(self, validated_data):
        '''
        Create method executes when ImageSerializer.save() is called. Will save an instance
        of the AdvertismentImage in the database
        '''
        ad = self.context['ad']
        image = AdvertismentImage.objects.create(
            ad_id=ad, 
            **validated_data
        )
        return image
    


    


    

    
    
