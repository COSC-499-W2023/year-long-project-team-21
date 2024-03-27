from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage
from Advertisments.api.serializers import (
    AdvertismentSerializer,
    ImageSerializer,
    ReturnAdvertismentSerializer,
    LocationSerializer,
)
from Advertisments.models import Advertisment, AdvertismentImage
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import *
from datetime import date


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
            Response: Response object with the ad data and a HTTP_201_CREATED response
        """

        if request.META["PATH_INFO"] == "/ads/location/":
            return get_ads_location(request)

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
            Response: Response object with the ad data and image path as json
                      If multiple ads are returned they will be returned as a list

        """
        if request.META["PATH_INFO"] == "/ads/categories/":
            return get_ads_category(request)

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

            return retrieve_advertisments_for_user(request, user_id)

        # ad_id and user_id not provided: get all ads in database
        return retrieve_all_advertisments(request)

    def put(self, request, *args, **kwargs):
        """
        Handle PUT requests to update an existing ad. Requires authentication so valid token must
        be included in the request header.

        Request should include these fields in the data body as JSON
            - title
            - description (optional)
            - category
            - expiry datetime (optional)
                - expected format = 'yyyy-mm-ddThh:mm:ss:nnnnnnZ

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
        return update_advertisment(request)

    def delete(self, request, *args, **kwargs):
        """
        Handle DELETE requests to delete an existing ad in the database.
        Requires authentication so valid token must be included in the request header.

        Request should include these fields in the data body as JSON
            - ad_id

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

        # Validate ad to delete exists
        try:
            ad_id = request.data["ad_id"]
            ad = Advertisment.objects.get(pk=ad_id)
        except:
            return Response(
                {"detail": "Post to delete does no exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate ad to delete was created by the person who made the request
        if ad.user_id != request.user.id:
            return Response(
                {"detail": "You cannot delete someone else's post!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # call function to create the ad
        ad.delete()
        return Response({"detail": "Post deleted."}, status=status.HTTP_200_OK)


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


def update_advertisment(request):
    """
    Any PUT request is passed to this method. Updates an existing ad in the database.

    Will return 201 CREATED response if successful.
    """
    # validate ad being updated exists
    try:
        ad_id = request.data["ad_id"]
        ad = Advertisment.objects.get(pk=ad_id)
    except:
        return Response(
            {"detail": "Post to update does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # validate ad being updated was created by requesting user
    if ad.user_id != request.user.id:
        return Response(
            {"detail": "Cannot update post created by another user."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # pass new ad data to serializer and validate passed data
        ad_serializer = AdvertismentSerializer(ad, data=request.data)
        if ad_serializer.is_valid():
            # if valid save updated ad
            ad_serializer.save()
            return Response(ad_serializer.validated_data, status=status.HTTP_200_OK)
        else:
            # if serializer returned errors on validation return errors and HTTP_400 status
            return Response(ad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # if error occurs return error message and detail with HTTP_500 status
        response = {"message": "Error updating post", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

        combined = {
            **serializer.data,
            **image_serializer.data,
        }  # Merge two dictionaries

        # return response data of both serializers and 200 OK response
        return Response(combined, status=status.HTTP_200_OK)
    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def retrieve_advertisments_for_user(request, user_id):
    """
    GET request to handle retrieving ads from the database.

    This method will return all ads created by the user that matches passed user_id. It uses
    pagination so it will split the result into pages and return a page of results at a time

    /ads/users/<user_id>?page=2 or /ads/users/<user_id>?page=3

    if no page number is supplied, the first page is returned
    if the page number is out of bounds, a HTTP_204 response is returned
    """
    try:
        # query all ads and their images for passed user
        user_ads = Advertisment.objects.filter(user_id=user_id)
        user_ad_images = AdvertismentImage.objects.filter(ad_id__in=user_ads)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT)

    try:
        # put query results into pages
        ad_paginator = Paginator(user_ads, 3)
        image_paginator = Paginator(user_ad_images, 3)

        # gets data for the current page
        page_number = request.GET.get("page")
        if page_number is None:
            page_number = 1
        ad_page = ad_paginator.page(page_number)
        image_page = image_paginator.page(page_number)

        # send each page to serializer to package data
        serializer = ReturnAdvertismentSerializer(ad_page, many=True)
        image_serializer = ImageSerializer(image_page, many=True)

        # merge results into one data structure
        combined_data = []
        for ad, image in zip(serializer.data, image_serializer.data):
            combined = {**ad, **image}  # Merge two dictionaries
            combined_data.append(combined)

        return Response(
            combined_data,
            status=status.HTTP_200_OK,
        )

    # when index for page is out of bounds return 204 response
    except EmptyPage as e:
        return Response(status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def retrieve_all_advertisments(request):
    """
    GET request to handle retrieving ads from the database. No authentication required.

    This method will return all ads in the database. It uses pagination so it will split
    the result into pages and return a page of results at a time

    To get a specific page of ads, the page number has to be passed in the GET request header
    like this:

    /ads?page=2 or /ads?page=3

    if no page number is supplied, the first page is returned
    if the page number is out of bounds, a HTTP_204 response is returned

    """
    try:
        # query all ads and their images
        all_ads = Advertisment.objects.all().defer("description")
        all_images = AdvertismentImage.objects.all()
    except:
        return Response(status=status.HTTP_204_NO_CONTENT)

    try:
        # put query results into pages
        ad_paginator = Paginator(all_ads, 3)
        image_paginator = Paginator(all_images, 3)

        # gets data for the current page
        page_number = request.GET.get("page")
        if page_number is None:
            page_number = 1
        ad_page = ad_paginator.page(page_number)
        image_page = image_paginator.page(page_number)

        # send each page to serializer to package data
        serializer = ReturnAdvertismentSerializer(ad_page, many=True)
        image_serializer = ImageSerializer(image_page, many=True)

        # merge results into one data structure
        combined_data = []
        for ad, image in zip(serializer.data, image_serializer.data):
            combined = {**ad, **image}  # Merge two dictionaries
            combined_data.append(combined)

        return Response(
            combined_data,
            status=status.HTTP_200_OK,
        )

    # when index for page is out of bounds return 204 response
    except EmptyPage as e:
        return Response(status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_ads_location(request):

    # serialize incoming data
    serializer = LocationSerializer(data=request.data)

    # return a 400 if it is a bad request
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # retrieve requesting user's range, longitude, and latitude
    req_range = serializer.validated_data["range"]
    req_longitude = serializer.validated_data["longitude"]
    req_latitude = serializer.validated_data["latitude"]

    # create a Point for the user using GeoDjango
    user_location = Point(req_longitude, req_latitude)

    # filter ads nearby based on radius, append a location which is the distance between the long/lat, and then retrieve images
    try:
        nearby_ads = (
            Advertisment.objects.filter(
                location__distance_lt=(user_location, D(km=req_range))
            )
            .annotate(distance=Distance("location", user_location))
            .order_by("distance")
            .prefetch_related("ad_image")
        )

        # put query results into pages
        ad_paginator = Paginator(nearby_ads, 3)

        # gets data for the current page
        page_number = request.GET.get("page")
        if page_number is None:
            page_number = 1
        ad_page = ad_paginator.page(page_number)

        ad_serializer = ReturnAdvertismentSerializer(ad_page, many=True)

        # return response dependant on data in the response
        if ad_serializer.data is not None:
            return Response(
                ad_serializer.data,
                status=status.HTTP_200_OK,
            )

        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    # when index for page is out of bounds return 204 response
    except EmptyPage as e:
        return Response(status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_ads_category(request):

    # retrieve all the categories parameter from the request
    categories = set()
    pageNumber = None
    for key, value in request.query_params.items():
        if key != "page":
            categories.add(value)
        elif key == "page":
            pageNumber = value

    # return an error if there isn't any categories
    if len(categories) == 0 or pageNumber == None:
        response = {"message": "Endpoint expecting category / pageNumber"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    category_filters = Q()
    for category_name in categories:
        category_filters &= Q(category=category_name)

    try:

        categorized_ads = (
            Advertisment.objects.filter(category_filters)
        ).prefetch_related("ad_image")

        # put query results into pages
        ad_paginator = Paginator(categorized_ads, 3)

        # gets data for the current page
        ad_page = ad_paginator.page(pageNumber)

        # serialize data
        ad_serializer = ReturnAdvertismentSerializer(ad_page, many=True)

        # return response dependant on data in the response
        if ad_serializer.data is not None:
            return Response(
                ad_serializer.data,
                status=status.HTTP_200_OK,
            )
    # when index for page is out of bounds return 204 response
    except EmptyPage as e:
        return Response(status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_ads_category_location(request):
    print("Penis")


def parse_categories(categories):
    """'
    Function returns a Q() complex query with all the categories, needed to programmically sort an N amount of categories.
    """
    category_filters = Q()
    for category_name in categories:
        category_filters &= Q(category=category_name)
    return category_filters
