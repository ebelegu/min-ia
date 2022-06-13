FROM node:16-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

## Server side
COPY server server

WORKDIR /home/node/app/server
RUN yarn install --frozen-lockfile
RUN yarn run build

## Client side
WORKDIR /home/node/app
COPY client/src client/src
COPY client/package.json client/package.json
COPY client/yarn.lock client/yarn.lock
COPY client/next.config.js client/next.config.js
COPY client/next-env.d.ts client/next-env.d.ts
COPY client/tsconfig.json client/tsconfig.json
## Bare lokalt --> TODO: fix me så vi kan kjøre lokalt
##COPY client/.env.local client/.env
COPY client/.env.byggserver client/.env

WORKDIR /home/node/app/client
RUN yarn install --frozen-lockfile
RUN yarn run build

WORKDIR /home/node/app
COPY start.sh start.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
