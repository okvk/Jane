FROM nginx:1.12.2-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN  mkdir -p /disk/log/nginx && chown -R nginx:nginx /disk/log/nginx

VOLUME ["/disk/log", "/etc/nginx/conf.d/"]
