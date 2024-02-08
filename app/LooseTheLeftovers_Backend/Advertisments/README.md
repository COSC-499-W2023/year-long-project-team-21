# Advertisments Microservice

### Model Overview

Advertisments holds all ads created by users. Below is the table schema:

| Field_Name  | Type          | Comment             |
| ----------- | ------------- | -----------         |
| id          | int           | primary key         |
| user_id     | int           | FK to Users         |
| title       | varchar(50)   |                     |
| description | varchar(500)  |                     |
| category    | varchar(20)   |                     |
| expiry      | datetime      |                     |
| created     | datetime      | auto field          |
| view_count  | int           |                     |
| is_active   | boolean       |                     |
| location    | point         |                     |

AdvertismentImage stores the images for each ad. There is a OneToOne relationship between this table
and Advertisments

| Field_Name  | Type          | Comment             |
| ----------- | ------------- | -----------         |
| id          | int           | primary key         |
| ad_id       | int           | FK to Advertisments |
| image       | imag          |                     |

### GET Advertisments

A GET request can be made in three different ways to /ads/:

    1. '/ads/<int>' will return a single ad
    2. '/ads/users/<int>' will return all ads created by a user
    3. '/ads/' will return all ads

Getting ads does not require authentication.

### POST Advertisments

A POST request can be made in to /ads/ to create a new ad. This requires authentication.
The POST request should contain the following data passed as a multipart JSON:

    title
    description
    category
    expiry
    image
