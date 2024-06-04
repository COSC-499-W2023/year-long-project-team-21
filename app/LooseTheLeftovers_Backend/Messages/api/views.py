from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Q
import polars as pl
from django.core.exceptions import ObjectDoesNotExist

from Advertisments.models import Advertisment
from Users.models import CustomUser
from Messages.models import Message
from Messages.api.serializers import MessageSerializer, GetMessageSerializer, LastMessageSerializer

class MessageHandler(APIView):
    """
    API View for handling message requests.

    This view handles creating messages with POST requests as well as retrieving
    messages from the database.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new message. Requires authentication so valid token must
        be included in the request header.

        Args:
            request (HttpRequest): The request object containing the message data.
            The json data contained in the request should include:
                msg (the contents of the message)
                user_id (of the user receiving the message)
                ad_id

        Returns:
            Response: Response object with the message data and a HTTP_201_OK response
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
        logged in to access chat. This method will redirect to another method to return messages. 
        
        If a user_id is included in the GET request header, this method will redirect to return the conversation between 
        that user and the requesting user.
        If no user_id is included this method will redirect to retrieve the last message in all conversations for the 
        requesting user.
        
        Returns:
            Response: Response object with the messages as json. Messages will be sorted from newest to oldest

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

            if user_id is None:
                return get_last_message_per_conversation(request)

            # no user id was passed: return each converstation and the last message
            else:
                return get_messages(request, user_id)
                    
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

def send_message(request):
    '''
    POST request to send a message from on user to another. 

    Request should include:
        -msg contents
        -user id (of receiver)
        -ad id
    '''

    # retrieve receiver to validate that it exists and the ad
    try:    
        CustomUser.objects.get(pk=request.data['receiver_id'])
    except:
        return Response("invalid recipient", status=status.HTTP_400_BAD_REQUEST)
    
    try:
        ad = Advertisment.objects.get(pk=request.data['ad_id'])
    except:
        return Response("invalid advertisment id", status=status.HTTP_400_BAD_REQUEST)
    
    # deserialize incoming data
    msg_serializer = MessageSerializer(
        data=request.data, context={"request": request, "ad": ad}
    )

    # validate data in request
    #   if serializer is not valid return 400 response
    if not msg_serializer.is_valid():
        return Response(msg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        # save ad
        msg_serializer.save()

        # return 201 response indicating ad was created successfully
        return Response(msg_serializer.validated_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_messages(request, other_user_id):
    """
    GET request to handle retrieving Messages from the database.

    This method will return all messages in a converstation between the requesting user,
    the other user in the conversation, and the ad the converstation relates to.
    """

    # get data to query messages from the request
    request_user_id = request.user.id
    ad_id = request.GET.get('ad_id')
    ad = Advertisment.objects.get(pk=ad_id)

    # get username of other user
    username = CustomUser.objects.get(pk=other_user_id).username

    # retrieve messages where the request user is the sender
    messages_sent = Message.objects \
        .filter(ad_id=ad) \
        .filter(sender_id=request_user_id) \
        .filter(receiver_id=other_user_id) \
        .order_by('time_sent')
    
    # retrieve messages where the request user is the receiver
    messages_received = Message.objects \
        .filter(ad_id=ad) \
        .filter(sender_id=other_user_id) \
        .filter(receiver_id=request_user_id) \
        .order_by('time_sent')
    
    # get page number from request
    page_number = request.GET.get("page")
    if page_number is None:
        page_number = 1

    try:
        # if neither query returned result, return http 204 no content response
        if len(messages_sent) == 0 and len(messages_received) == 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # if there are no messages sent and only received, return received messages
        if len(messages_sent) == 0:

            # paginate results
            msg_paginator = Paginator(messages_received, 6)
            msg_page = msg_paginator.page(page_number)
            serializer_received = GetMessageSerializer(msg_page, many=True, context={'username': username})
            return Response(
                serializer_received.data,
                status=status.HTTP_200_OK,
            )
        
        # if there are no messages received and only sent, return sent messages
        if len(messages_received) == 0:

            # paginate results
            msg_paginator = Paginator(messages_sent, 6)
            msg_page = msg_paginator.page(page_number)
            serializer_sent = GetMessageSerializer(msg_page, many=True, context={'username': username})
            return Response(
                serializer_sent.data,
                status=status.HTTP_200_OK,
            )
 
        # if there are both sent and received messages, serialize both to json
        messages = messages_sent.union(messages_received).order_by("-time_sent")
    
        # put query result into pages
        msg_paginator = Paginator(messages, 6)

        # gets data for the current page
        msg_page = msg_paginator.page(page_number)

        # serialize to json and return response
        serializer_sent = GetMessageSerializer(msg_page, many=True, context={'username': username})
        return Response(
            serializer_sent.data,
            status=status.HTTP_200_OK,
        )
    # when index for page is out of bounds return 204 response       
    except EmptyPage:
        return Response(status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        # send problem response and server error
        response = {"message": "Error retrieving messages", "error": str(e)}
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_last_message_per_conversation(request):
    """
    GET request to handle retrieving last message for each conversation for the requesting
    user.

    This method will get a list of conversation the user has, the for each conversation get
    the last message.

    Returns a list of last messages where each message contains:
        -username (of the other person in the conversation)
        -msg content
        -time sent
    Note a list is always returned, even if only one item is found
    """
    # query all messages the requesting user is a sender or receiver
    request_user = request.user.id
    receivers = Message.objects.filter(sender_id=request_user).values_list('receiver_id', 'ad_id')
    senders = Message.objects.filter(receiver_id=request_user).values_list('sender_id', 'ad_id')

    # convert query result to df to get unique values 
    conversation_list = list(receivers) + list(senders)
    D = {'user_id': [], 'ad_id': []}
    for user_id, ad_id in conversation_list:
        D.get('user_id').append(user_id)
        D.get('ad_id').append(ad_id)
    
    # polars changed this method recently, adding try/catch just in case
    try:
        df = pl.DataFrame._from_dict(D)
    except:    
        df = pl.from_dict(D)
        
    df = df.unique()

    # get username, msg, time_sent for last message in each conversation
        # user represents the other person in the converstation with the request user
    last_msg_list = []
    for row in df.iter_rows():

        user = row[0]
        ad_id = row[1]

    try:
        # get username
        username = CustomUser.objects.get(pk=user).username
        # get last message in conversation
        last_message = Message.objects.filter(
            (Q(receiver_id=user) & Q(sender_id=request_user) & Q(ad_id=ad_id)) | (Q(receiver_id=request_user) & Q(sender_id=user) & Q(ad_id=ad_id))
        ).last()
        # append as dictionary to list
        last_msg_list.append({"user_id": user, "username": username, "msg": last_message.msg, "time_sent": last_message.time_sent, "ad_id": last_message.ad_id.id})
    
        # put result into pages
        msg_paginator = Paginator(last_msg_list, 6)

        # gets data for the current page
        page_number = request.GET.get("page")
        if page_number is None:
            page_number = 1
        msg_page = msg_paginator.page(page_number)
        
        # serialize to JSON and return
        serialized_messages = LastMessageSerializer(msg_page, many=True)
        return Response(serialized_messages.data, status.HTTP_200_OK)
    
    except EmptyPage:
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_204_NO_CONTENT)
       


    
