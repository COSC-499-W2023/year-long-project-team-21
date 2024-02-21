# Ratings Microservice

### Model Overview

| Field_Name  | Type          | Comment     |
| ----------- | ------------- | ----------- |
| id          | int           | primary key |
| rating      | int           |             |
| giver_id    | int           | FK to Users |
| receiver_id | int           | FK to Users |

### GET Ratings

A GET request can be made to /ratings/ to get the rating for a user. Authentication is required.
The rating value returned is the average of all ratings received by that user in the database.

Input:
- user_id

Fields returned:
- rating
- user_id

### POST Ratings

A POST request can be made in to /ratings/ to store a new rating. This requires authentication.
The POST request should contain the following data passed as JSON:

- rating
- receiver_id (of the user being given the rating)

The user giving the rating is included in the request automatically and will be stored as well.