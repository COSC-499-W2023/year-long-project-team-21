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
- paassword
- verify_passowrd

### Overview

This post request is first handled by the LooseTheLeftovers_Backend `urls.py` file. It takes that request and sends it to the Users app, that is what the `users/` portion of the POST request means. The Users own `urls.py` handles the incoming POST request and sends it along to `register_user`. `register_user` recieves the HTTP request and calls `RegistrationSerializer` to deserialize the incoming JSON into a CustomUser model while validating the data. Think of the serializer as a bridge between the `urls.py` and the `views.py` file. `RegistarationSerializer` may raise errors which are passed to `register_user` if the incoming passwords are not the same, username is already in use and if the email is already in use. Upon successful model creation, `register_user` will query and retrieve the authentication token created for that user and send that as the response. In the `models.py` folder, anytime a new CustomUser model is created, a new authentication token is created as well.
