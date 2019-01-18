FROM python:3.7-alpine

RUN apk add --no-cache jpeg-dev zlib-dev mysql-dev
RUN pip3 install virtualenv

RUN virtualenv /env
ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

COPY ./deployment/django/docker-entrypoint.sh  /env/app/
RUN chmod +x /env/app/docker-entrypoint.sh

# Copy requirements.pip in advance
COPY ./backend/requirements/ /env/app/requirements/

WORKDIR /env/app

RUN apk add --no-cache --virtual .build-deps build-base linux-headers \
    && pip install -r requirements/production.pip \
    && apk del .build-deps

# Reading the context from the docker-compose build setting
COPY ./backend/ /env/app

EXPOSE 8080

ENTRYPOINT ["/env/app/docker-entrypoint.sh"]

CMD ["sh", "-c", "/env/bin/gunicorn --workers 4 --timeout 240 --bind  0.0.0.0:8080  config.wsgi:application"]
