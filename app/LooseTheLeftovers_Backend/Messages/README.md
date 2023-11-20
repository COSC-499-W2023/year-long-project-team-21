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