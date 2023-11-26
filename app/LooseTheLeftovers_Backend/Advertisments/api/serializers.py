from rest_framework import serializers
from Advertisments.models import Advertisment

class AdvertismentSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000)
    category = serializers.CharField(max_length=30)
    expiry = serializers.DateTimeField()

    def create(self, validated_data):
        return Advertisment.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.user_id = validated_data.get('user_id', instance.user_id)
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.desciption = validated_data.get('description', instance.description)
    #     instance.category = validated_data.get('category', instance.category)
    #     instance.expiry = validated_data.get('expiry', instance.expiry)
    #     instance.save()
    #     return instance