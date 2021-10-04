#!/bin/sh

set -e
cd ..
python manage.py collectstatic --noinput
python manage.py wait_for_db
python manage.py migrate 
uwsgi --http :8000 --master --enable-threads --module ecomm.wsgi