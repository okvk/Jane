#! /bin/sh

set -e

until nc -z -v -w30 $HOST 3306
do
  echo "Waiting for database mysql connection..."
  sleep 1
done

>&2 echo "Mysql is up - continuing"

# Make db migrations when switch turn on
if [ "x$DJANGO_MANAGEPY_MIGRATE" = 'xon' ]; then
    /env/bin/python manage.py migrate --noinput
fi

# Collect static files when switch turn on
if [ "x$DJANGO_MANAGEPY_COLLECTSTATIC" = 'xon' ]; then
    /env/bin/python manage.py collectstatic --noinput
fi

exec "$@"
