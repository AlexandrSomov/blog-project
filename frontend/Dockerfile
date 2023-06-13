FROM node:19.7-bullseye-slim AS basic

WORKDIR /app

RUN apt-get update && apt-get install -y \
    rsync \
    nano \
    procps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci \
    && npm prune

ENV PATH $PATH:/app/node_modules/.bin

COPY . .
CMD npm run start || { cat /root/.npm/_logs/*.log && exit 1; }

FROM basic AS build

RUN npm run build

FROM node:19.7-bullseye-slim AS static

WORKDIR /app

RUN npm i -g serve

COPY --from=build /app/build .

CMD serve -s
