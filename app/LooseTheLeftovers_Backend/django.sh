#!/bin/bash
echo "Create migrataions"
python manage.py makemigrations
echo "***"


echo "Migrate"
python manage.py migrate
echo "***"

echo "Start server on 0.0.0.0:8000"
python manage.py runserver 0.0.0.0:8000