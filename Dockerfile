FROM node:10.14-stretch-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .


RUN npm install

COPY index.js .
COPY credits.js .
COPY credits.js .
COPY setupdb.js .
COPY server.js .
COPY dist dist


ENV NODE_ENV=production

RUN npm setupdb.js

EXPOSE 3000
CMD npm start