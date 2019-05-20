# build environment
FROM node:10.15.0 as builder

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/package.json ./frontend/yarn.lock /app/
RUN yarn install --silent
COPY ./frontend /app
# Read backend API from environment variables
ENV REACT_APP_JANE_API=$REACT_APP_JANE_API
RUN yarn run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ./deployment/nginx/nginx.conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
VOLUME ["/usr/share/nginx/statics",]
CMD ["nginx", "-g", "daemon off;"]
