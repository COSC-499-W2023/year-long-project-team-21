# Users Microservice

## Token creation

To retrieve an authentication token, send a POST request to `users/token`

This post request must contain the following parameters

- username
- password

## Register User

To register a user, send a POST request to `users/`.

This post request must contain the following parameters

- email
- username
- password
- verify_password

## GET Users

It is possible to retrieve a list of users and an individual user.

Simply send an authenticated GET request to `/users/` to retrieve a list of all the current users. The fields that you get are: 
- username 
- id 
- email

Functionality is also included to recieve an individual user. Attatch a user_id to the end of the URI to request an individual user. If the user does not exist, a 500 error
will be produced.

If your request is not authenticated, you will recieve a 401.

## Update Users

It is possible to use a PUT request to update the user profile or the user password.

To update the user profile, send an authenticated PUT request to `/users/` and include these fields in the body of
the request as JSON:
-email
-first_name
-last_name
-longitude
-latitude

To update a user's password, send an authenticated PUT request to `/users/` and include these fields in the body of
the request as JSON:
-old_password
-new_password
-confirm_password

The backend will check if old_password matches the user's current password. If false a HTTP_401_UNAUTHORIZED 
response is returned and "detail" will be filled in the response containing "Incorrect password entered".

If new_password and confirm_password do not match, the backend will return a HTTP_400_BAD_REQUEST response and 
"detail" will be filled in the response containing "Passwords must match"

Note the backend differentiates between the two different PUT requests by checking if 'new_password' field is
supplied.

### Overview

This post request is first handled by the LooseTheLeftovers_Backend `urls.py` file. It takes that request and sends it to the Users app, that is what the `users/` portion of the POST request means. The Users own `urls.py` handles the incoming POST request and sends it along to `register_user`. `register_user` recieves the HTTP request and calls `RegistrationSerializer` to deserialize the incoming JSON into a CustomUser model while validating the data. Think of the serializer as a bridge between the `urls.py` and the `views.py` file. `RegistarationSerializer` may raise errors which are passed to `register_user` if the incoming passwords are not the same, username is already in use and if the email is already in use. Upon successful model creation, `register_user` will query and retrieve the authentication token created for that user and send that as the response. In the `models.py` folder, anytime a new CustomUser model is created, a new authentication token is created as well.
