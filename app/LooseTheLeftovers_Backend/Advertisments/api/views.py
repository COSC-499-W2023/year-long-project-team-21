from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from Advertisments.api.serializers import AdvertismentSerializer, ImageSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_advertisment(request):
    '''
    POST request to handle creating new advertisment.

    Only logged in users can create ads so a valid JWT Access token must be included in the header. 
    After authentication both AdvertismentSerializer and ImageSerializer are initiated and used to 
    validate the fields passed in the POST request. If both are valid the ad and image will be saved.

    HTTP POST request requires these fields:
        - title
        - description
        - category
        - expiry datetime
            - expected format = 'yyyy-mm-ddThh:mm:ss:nnnnnnZ
            - example: '2013-01-29T12:34:56.000000Z'
        - image
            - to be provided as a Django SimpleUploadFile

    Returns:
        - If successful, returns a HTTP response 201 and validated data from serializer used to create ad
        - If unsuccessful
            returns HTTP 401 if user is not authenticated
            returns HTTP 405 if not a POST request
            returns HTTP 400 response with errors generated by the serializer if serializers could not validate
    '''

    # deserialize incoming data
    ad_serializer = AdvertismentSerializer(data=request.POST, context={'request': request})
    image_serializer = ImageSerializer(data=request.FILES)

    # validate data in request
    #   if either serializer is not valid return 400 response
    if not ad_serializer.is_valid():
        return Response(ad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if not image_serializer.is_valid():
        return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # save ad
    ad = ad_serializer.save()
    
    # create new instance of ImageSerializer to include the created ad as context
    #   have to call .is_valid() again in order to call .save()
    #   is_valid will always be True because it was already valided above
    image_serializer = ImageSerializer(data=request.FILES, context={'ad': ad})
    if image_serializer.is_valid(): 
        image_serializer.save()

    # return 201 response indicating ad was created successfully
    return Response(ad_serializer.validated_data, status=status.HTTP_201_CREATED)