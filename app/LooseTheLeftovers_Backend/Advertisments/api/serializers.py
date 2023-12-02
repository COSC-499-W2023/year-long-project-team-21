from rest_framework import serializers
from Advertisments.models import Advertisment

class AdvertismentSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField(required=False)
    
    def create(self, validated_data):
        user = self.context['request'].user
        ad = Advertisment.objects.create(
            user_id=user.id, 
            **validated_data
        )
        return ad