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

## Create Super User

Ensure the docker containers are running. 

Run `docker-compose exec djangoapp python manage.py createsuperuser`and follow the instructions

## Code Formatting 

This project uses `black` code auto formatter

You will need to use this in your IDE (preferabbly VSCODE) but Django has this built in as a dependency. 

To use the built in, type in the command `docker-compose exec djangoapp black .`


## Naming Conventions 

1. **Variable Names** (snake_case): `my_variable`, `count_items`
2. **Function Names** (snake_case): `calculate_total`, `process_data`
3. **Constant Names** (SCREAMING_SNAKE_CASE): `PI`, `MAX_LENGTH`
4. **Class Names** (CamelCase): `MyClass`, `BankAccount`
5. **Module Names** (snake_case): `my_module`, `data_processing`
6. **Package Names** (lowercase): `mypackage`, `utilities`
7. **Private Names** (prefix with underscore): `_my_variable`, `_internal_function`
8. **Special Names** (Dunder/Magic Methods): `__init__`, `__str__`, `__len__`
9. **Acronyms and Abbreviations**: `IO`, `HTTPServer`
10. **Whitespace in Expressions**: `x = 5`, `result = a + b`
11. **Indentation**: Use 4 spaces for each level.
12. **Line Length**: Limit lines to 79-80 characters.
13. **Docstrings**: Use triple double-quotes for documentation.
14. **Imports**: Organize imports into standard library, third-party, and local sections.
15. **Booleans**: Use `True` and `False`.

## Tests

To run the tests, you will need to access the app's bash terminal inside docker. 

Use `docker-compose exec djangoapp bash` and then navigate to `cd /src`

We are going to use Django's built in testing suite. To run tests, simply type in `python manage.py test`

Use `exit` to do what it says on the tin. 

