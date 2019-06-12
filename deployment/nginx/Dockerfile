# build environment
FROM node:10.15.0 as builder

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/package.json ./frontend/yarn.lock /app/
RUN yarn install --silent
COPY ./frontend /app
ARG REACT_APP_JANE_API
# Read backend API from environment variables
RUN yarn run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ./deployment/nginx/nginx.conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
VOLUME ["/usr/share/nginx/statics", "/usr/share/nginx/media"]
CMD ["nginx", "-g", "daemon off;"]
