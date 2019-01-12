FROM python:3.7-alpine

RUN apk add --no-cache jpeg-dev zlib-dev mysql-dev
RUN pip3 install virtualenv

RUN virtualenv /env
ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

COPY ../../backend/ /env/app

ADD ./docker-entrypoint.sh  /env/app
RUN chmod +x /env/app/docker-entrypoint.sh

WORKDIR /env/app

RUN apk add --no-cache --virtual .build-deps build-base linux-headers\
    && pip install -r requirements.txt \
    && apk del .build-deps

EXPOSE 8080

ENTRYPOINT ["/env/app/docker-entrypoint.sh"]

CMD ["sh", "-c", "/env/bin/gunicorn --workers 4 --timeout 240 --bind  0.0.0.0:8080  config.wsgi:application"]
