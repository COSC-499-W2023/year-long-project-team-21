from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Avg
from django.utils.datastructures import MultiValueDictKeyError

from Users.models import CustomUser
from Ratings.models import Rating
from Ratings.api.serializers import RatingSerializer

class RatingHandler(APIView):
    """
    API View for handling Rating requests.

    This view handles adding Ratings to the database with POST requests as well as retrieving
    Ratings from the database.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to add a new rating. Requires authentication so valid token must
        be included in the request header.

        Args:
            request (HttpRequest): The request object containing the rating data.
            The json data contained in the request should include:
                rating
                user_id (of the user receiving the rating)
            
            The user that gives the rating is included in the GET request automatically

        Returns:
            Response: Response object with the rating data and a HTTP_201_OK response
        """
        # Manually authenticate user
        permission = IsAuthenticated()
        if not permission.has_permission(request, self):
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # call function to send message; will store the message in the database
        return create_rating(request)

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests to retrieve a raintg for a user. Requires authentication.
        
        A rating is retrieved by querying all ratings received for a user, then returning
        the average of the ratings for that user.
        
        Returns:
            HTTP Response
            JSON data including these fields
                -rating
                -user_id (that the rating belongs to)
        """

        # Manually authenticate user
        permission = IsAuthenticated()
        if not permission.has_permission(request, self):
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # if a user id was passed, get the conversation between users
        try:
            user_id = kwargs.get("user_id", None)

            if not user_id is None:
                return get_rating(request, user_id)

            # no user id was passed: return each converstation and the last message
            else:
                return Response(
                {"detail": "User id must be provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )
                
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        
def create_rating(request):
    '''
    POST request to store a rating for a user.

    Request should include:
        -rating
        -user_id
    '''  
    # retrieve user receiving the rating to validate that it exists
    try: 
        user_id = request.data['receiver_id']   
        CustomUser.objects.get(pk=user_id)
    except KeyError:
        return Response(
            {"detail": "'receiver_id' must be provided."},
            status=status.HTTP_400_BAD_REQUEST,
        )   
    except:
        return Response(status=status.HTTP_204_NO_CONTENT)

    # deserialize incoming data
    rating_serializer = RatingSerializer(data=request.data, context={"request": request})

    # validate data in request
    #   if serializer is not valid return 400 response
    if not rating_serializer.is_valid():
        return Response(rating_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # save rating
        rating_serializer.save()

        # return 201 response indicating ad was created successfully
        return Response(rating_serializer.validated_data, status=status.HTTP_201_CREATED)
    except:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def get_rating(request, user_id):
    """
    GET request to retrieve rating for given user from the database.

    This method will return the average of all ratings saved for the user.
    """
    try:
        # query to get average rating for the given user

        rating = Rating.objects.filter(receiver_id=user_id).aggregate(Avg('rating'))['rating__avg']

        # if there are no ratings returned return 204
        if rating is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # serialize to json and return response
        data = {'rating': round(rating, 2)}
        return Response(data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving rating", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

