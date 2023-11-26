# build stage
FROM node:18.17.0 AS build

WORKDIR /build
COPY ./package.json .

RUN npm install -g npm@10.2.3 && \
    npm install

# app stage
FROM node:18.17.0 AS app

CMD ["npm", "run", "start"]

# http check utility
WORKDIR /utils
COPY ./utils/http-check.js .

WORKDIR /app
COPY --from=build /build .
COPY . .
