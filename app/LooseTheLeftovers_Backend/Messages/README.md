# Messages Microservice

### Model Overview

Messages holds all messages sent between users on the app. Below is the table schema:

| Field_Name  | Type          | Comment     |
| ----------- | ------------- | ----------- |
| id          | int           | primary key |
| msg         | varchar(1000) |             |
| time_sent   | datetime      | auto field  |
| sender_id   | int           | FK to Users |
| receiver_id | int           | FK to Users |
| ad_id       | int           |             |

### GET Messages

A GET request can be made to two different endpoints to return Message data

#### 1. /messages/<int: user_id>

This will return all messages between two users related to some ad. Conversation 
will be returned sorted Newest to Oldest according to time_sent

Input:
- user_id
- ad_id (in GET request header)
- page (in GET request header)

Fields returned:
* msg
* send_id
* receiver_id
* ad_id
* time_sent

in GET request header means it can be passed in the url following a '?'. 

For example to get the first page of a conversation between the requesting user and user_id=1
relating to ad_id=1 (omited page will return page 1)
    
    /messages/1?ad_id=1

And to get the second page of that conversation:

    /messages/1?ad_id=1&page=2


#### 2. /messages/

Input:
- page (in request header)

Fields returned:
- user_id (of the other person in the conversation)
- username (of the other person in the conversation)
- msg
- time_sent

This will return the last message in all conversations for the user. This is
to be displayed on the user's messages screen to view all open conversations.
If page is omited the first page of results is returned.

Examples:

    /messages

And to get the second page of conversations:

    /messages?page=2

### POST Messages

A POST request can be made in to /messages/ to create a new message. This requires authentication.
The POST request should contain the following data passed as JSON:

- msg
- receiver_id
- ad_id


