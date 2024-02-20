#!/bin/bash
echo "Create migrations"
python manage.py makemigrations
echo "***************************************************"


echo "Migrate"
python manage.py migrate
echo "***************************************************"

echo "Load initial data"
python manage.py loaddata users
python manage.py loaddata advertisments
echo "***************************************************"

echo "Start server on 0.0.0.0:8000"
python manage.py runserver 0.0.0.0:8000