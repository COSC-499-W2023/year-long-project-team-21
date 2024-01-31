from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from Advertisments.api.serializers import (
    AdvertismentSerializer,
    ImageSerializer,
    ReturnAdvertismentSerializer,
    ReturnAdvertismentNoDescriptionSerializer,
)
from Advertisments.models import Advertisment, AdvertismentImage
from rest_framework.utils.serializer_helpers import ReturnList
from datetime import date, datetime


class AdvertismentHandler(APIView):
    """
    API View for handling advertisment requests.

    This view handles creating ads with POST requests as well as retrieving
    ads from the database.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new ad. Requires authentication so valid token must
        be included in the request header.

        Args:
            request (HttpRequest): The request object containing the advertisment data.
            Also has to contain an image to include with the ad

        Returns:
            Response: Response object with the ad data and a HTTP_201_OK response
        """
        # Manually authenticate user
        permission = IsAuthenticated()
        if not permission.has_permission(request, self):
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        # call function to create the ad
        return create_advertisment(request)

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests to retrieve ads and their corresponding images. Does not require authentication.
        This method will redirect to another method to return ads based on passed parameters and
        endpoint URL used.

            URL: ads/<int>
                will return single add where int is the primary key of the ad
            URL: ads/user/<int>/
                will return all ads created by a single user where <int> is the foreign key user_id
            URL: ads/
                will return all ads in the database

        Args:
            request (HttpRequest): The request object. (optional) ad_id or (optional) user_id

        Returns:
            Response: Response object with the ad(s) and ad image(s)

        Detail on the response data structure:

            Data contained in the response is returned as two OrderedDicts in a list,
            where response.data[0] is the ad data and response.data[1] contains the image path,
            and response.data[2] contains the expiry colors and days/weeks as a string

            If more than 1 ad is returned, another list is nested inside which means:
            response.data[0] holds data for all ads, response.data[1] holds all image paths, and
            response data[2] holds all expiry information.
            To select data for the first add use response.data[0][0], first image response.data[0][1],
            and first expiry response.data[0][2]

            Some examples to get specific data from response.data:

                One ad returned
                    title = response.data[0]['title']
                    description = response.data[0]['description']
                    image_path = response.data[1]['image']
                    expiry_color = response.data[1]['color']

                Multiple ads returned
                    id = response.data[0][0]['id']                # id of first ad
                    expiry = response.data[0][2]['expiry']        # expiry of third ad
                    image_path = response.data[1][5]['image']     # image path of sixth ad
                    expiry_string = response.data[2][1]['expiry'] # expiry of second ad

        """
        # if request to create-ads endpoint was made via GET, return 405 response
        if request.META["PATH_INFO"] == "/ads/create":
            return Response(
                {"detail": "Invalid request method."},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )

        # if ad_id provided get single ad
        ad_id = kwargs.get("ad_id", None)
        if ad_id is not None:
            return retrieve_single_advertisment(ad_id)

        # if user_id provided get all ads for user
        user_id = kwargs.get("user_id", None)
        if user_id is not None:
            # Manually authenticate user
            permission = IsAuthenticated()
            if not permission.has_permission(request, self):
                return Response(
                    {"detail": "Authentication credentials were not provided."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            return retrieve_advertisments_for_user(user_id)

        # ad_id and user_id not provided: get all ads in database
        return retrieve_all_advertisments()


def create_advertisment(request):
    """
    POST request to handle creating new advertisment.

    Only logged in users can create ads so a valid JWT Access token must be included in the header.
    After authentication both AdvertismentSerializer and ImageSerializer are initiated and used to
    validate the fields passed in the POST request. If both are valid the ad and image will be saved.

    HTTP POST request requires these fields:
        - title
        - description (optional)
        - category
        - expiry datetime (optional)
            - expected format = 'yyyy-mm-ddThh:mm:ss:nnnnnnZ
        - image file

    Example JSON:

    json_data = {
        'title': 'Post Title',
        'description': 'Short description for post',
        'category': 'Vegan',
        'expiry': '2013-01-29T12:34:56.000000Z',
        'image': image_file
    }

    Returns:
        - If successful, returns a HTTP response 201 and validated data from serializer used to create ad
        - If unsuccessful
            returns HTTP 401 if user is not authenticated
            returns HTTP 405 if not a POST request
            returns HTTP 400 response with errors generated by the serializer if serializers could not validate
    """

    # deserialize incoming data
    ad_serializer = AdvertismentSerializer(
        data=request.POST, context={"request": request}
    )
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
    image_serializer = ImageSerializer(data=request.FILES, context={"ad": ad})
    if image_serializer.is_valid():
        image_serializer.save()
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # return 201 response indicating ad was created successfully
    return Response(ad_serializer.validated_data, status=status.HTTP_201_CREATED)


def retrieve_single_advertisment(ad_id):
    """
    GET request to handle retrieving ads from the database. No authentication required.

    This method will return a single ad and its image
    """
    try:
        # query ad and its image
        ad = Advertisment.objects.get(pk=ad_id)
        ad_image = AdvertismentImage.objects.get(ad_id=ad)
    except:
        response = {"message": "No ad found"}
        return Response(response, status=status.HTTP_204_NO_CONTENT)

    try:
        # send to serializers to package data
        serializer = ReturnAdvertismentSerializer(ad)
        image_serializer = ImageSerializer(ad_image)

        combined = {**serializer.data, **image_serializer.data}  # Merge two dictionaries

        # return response data of both serializers and 200 OK response
        return Response(
            combined, status=status.HTTP_200_OK
        )
    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def retrieve_advertisments_for_user(user_id):
    """
    GET request to handle retrieving ads from the database. No authentication required.

    This method will return all ads created by the user that matches passed user_id
    """
    try:
        # query all ads and their images for passed user
        user_ads = Advertisment.objects.filter(user_id=user_id)
        user_ad_images = AdvertismentImage.objects.filter(ad_id__in=user_ads)
    except:
        response = {"message": "No ad found"}
        return Response(response, status=status.HTTP_204_NO_CONTENT)

    try:
        # send to serializer to package data
        serializer = ReturnAdvertismentNoDescriptionSerializer(user_ads, many=True)
        image_serializer = ImageSerializer(user_ad_images, many=True)

        # get formatted expiry data for frontend for each ad returned
        #   if serializer data is ReturnList multiple ads were returned (single ad is ReturnDict)
        if type(serializer.data) is ReturnList:
            combined_data = []
            for ad, image in zip(serializer.data, image_serializer.data):
                combined = {**ad, **image}  # Merge two dictionaries
                combined_data.append(combined)

            return Response(
                combined_data,
                status=status.HTTP_200_OK,
            )

        combined = {**serializer.data, **image_serializer.data}  # Merge two dictionaries

        # return response data of both serializers and 200 OK response
        return Response(
            combined, status=status.HTTP_200_OK
        )

    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def retrieve_all_advertisments():
    """
    GET request to handle retrieving ads from the database. No authentication required.

    This method will return all ads in the database
    """
    #   TODO: add pagination to only return a certain number of ads at a time

    try:
        # query all ads and their images
        all_ads = Advertisment.objects.all()
        all_images = AdvertismentImage.objects.all()
    except:
        response = {"message": "No ad found"}
        return Response(response, status=status.HTTP_204_NO_CONTENT)

    try:
        # send to serializer to package data
        serializer = ReturnAdvertismentNoDescriptionSerializer(all_ads, many=True)
        image_serializer = ImageSerializer(all_images, many=True)

        # merge results into one data structure
        combined_data = []
        for ad, image in zip(serializer.data, image_serializer.data):
            combined = {**ad, **image}  # Merge two dictionaries
            combined_data.append(combined)

        return Response(
            combined_data,
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def get_expiry_formatted(expiry):
    '''
    returns dict with two items: color and expiry. Both items are formatted to how front end needs them.
    To be passed the expiry of the ad as datetime or None
    '''
    if expiry is None:
        return {'color': 'expiry_long', 'expiry': '2 weeks'}
    today = date.today()
    delta = expiry - today
    # >9 days will show as 2 weeks (long color)
    if delta.days > 9:
        return {'color': 'expiry_long', 'expiry': '2 weeks'}
    # >6 days will show as 1 week (mid color)
    elif delta.days > 6:
        return {'color': 'expiry_mid', 'expiry': '1 week'}
    # 1 day or less will show as 1 day (short color)
    elif delta.days <= 1:
        return {'color': 'expiry_short', 'expiry': '1 day'}
    # 1 to 6 days will show as 'n' days (short color)
    else:
        return {'color': 'expiry_short', 'expiry': str(delta.days) + ' days'}