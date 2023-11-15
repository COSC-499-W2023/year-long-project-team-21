# Advertisments Microservice

### Overview

Advertisments holds all ads created by users. Below is the table schema:

| Field_Name  | Type          | Comment     |
| ----------- | ------------- | ----------- |
| id          | int           | primary key |
| user_id     | int           | FK to Users |
| title       | varchar(50)   |             |
| description | varchar(500)  |             |
| image       | Image         |             |
| category    | varchar(20)   |             |
| expiry      | datetime      |             |
| created     | datetime      | auto field  |
| view_count  | int           |             |
| is_active   | boolean       |             |
| location    | point         |             |
