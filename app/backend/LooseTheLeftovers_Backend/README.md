# LooseTheLeftovers_Backend

This project uses two docker containers. One for hosting the backend and the other for hosting the postgreSQL database.

## Requirements
- Docker
- POSTMAN for testing the API


## Getting Started

### Envioronment Varaibles

First thing you need to do is open the 'env.example' that is attatched to this repo. 

I recommend changing PG_USER and PG_PASSWORD to your name and a password that you would like to use. 

After changing, save that file as `.env`. Docker will automatically look for that .env file and use it for the Django Settings 

### Running Docker

To start docker, ensure that docker desktop is open and simply type in `docker compose up`

Database migrations will automatically apply using the django.sh bash script. 

The stop docker, either press `control c` or `docker compose down` in a new terminal 

### Ports 

The Django Application is running on `0.0.0.0:8000` or simply `localhost:8000`. Type either one of these in to the browser to see the install worked successfully screen. 

The postgreSQL is running on `localhost with port 5432` by default. If you wish to access with a service such as DBEAVER, the user name and password will be the same as you specified in the [.env](/env.example) file

## Hot Reload

Aside from database changes, simply save your changes and it will be applied automatically. 

If you make database changes, you will need to migrate them. `docker compose up` will automatically migreate changes for you.

### Create Super User

Ensure the docker containers are running. 

Run `docker-compose exec djangoapp python manage.py createsuperuser`and follow the instructions





