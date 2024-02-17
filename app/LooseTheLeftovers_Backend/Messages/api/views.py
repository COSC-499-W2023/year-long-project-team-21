from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage

from Messages.models import Message
from Messages.api.serializers import GetMessageSerializer

class MessageHandler(APIView):
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
        # call function to send message; will store the message in the database
        return send_message(request)

    def get(self, request, *args, **kwargs):
        """
        Handle GET requests to retrieve a converstation between two users. Requires authentication as a user has to be
        logged in to access chat. This method will redirect to another method to return messages based on passed requesting
        user, other user id included in request, and the ad id

        Returns:
            Response: Response object with the messages as json. Messages will be sorted from oldest to newest

        """

        # Manually authenticate user
        permission = IsAuthenticated()
        if not permission.has_permission(request, self):
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # if authenticated redirect to get method to return conversation
        return get_messages(request)

def send_message(request):
    '''
    POST request to send a message from on user to another. 

    Request should include:
        -user id (of receiver)
        -ad id
    '''
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

def get_messages(request):
    """
    GET request to handle retrieving Messages from the database.

    This method will return all messages in a converstation between the requesting user,
    the other user in the conversation, and the ad the converstation relates to.
    """

    # get data to query messages from the request
    request_user_id = request.user.id
    other_user_id = request.GET.get('user_id')
    ad_id = request.GET.get('ad_id')

    # retrieve messages where the request user is the sender
    messages_sent = Message.objects \
        .filter(ad_id=ad_id) \
        .filter(sender_id=request_user_id) \
        .filter(receiver_id=other_user_id) \
        .order_by('time_sent')
    
    # retrieve messages where the request user is the receiver
    messages_received = Message.objects \
        .filter(ad_id=ad_id) \
        .filter(sender_id=other_user_id) \
        .filter(receiver_id=request_user_id) \
        .order_by('time_sent')

    try:
        # if neither query returned result, return http 204 no content response
        if len(messages_sent) == 0 and len(messages_received) == 0:
            response = {"message": "No messages found"}
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        
        # if there are no messages sent and only received, return received messages
        if len(messages_sent) == 0:
            serializer_received = GetMessageSerializer(messages_received, many=True)
            return Response(
                serializer_received.data,
                status=status.HTTP_200_OK,
            )
        
        # if there are no messages received and only sent, return sent messages
        if len(messages_received) == 0:
            serializer_sent = GetMessageSerializer(messages_sent, many=True)
            return Response(
                serializer_sent.data,
                status=status.HTTP_200_OK,
            )
 
        # if there are both sent and received messages, serialize both to json
        messages = messages_sent.union(messages_received).order_by("time_sent")
        serializer_sent = GetMessageSerializer(messages, many=True)

        return Response(
            serializer_sent.data,
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving all ads", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    