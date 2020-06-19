FROM node:10-alpine as build-stage

WORKDIR /app
COPY . /app/

RUN echo "Install dependencies"
RUN yarn install --pure-lockfile --non-interactive

RUN echo "Build app"
RUN yarn build

FROM nginx:1.15

RUN echo "Copying files to web server"
COPY --from=build-stage "/app/build/" /usr/share/nginx/html