FROM node:24-alpine as build

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_KEY

ARG HOST

ARG DIALECT

ARG DB

ARG USER

ARG PASS

ARG PORT

ENV API_KEY=$API_KEY

ENV HOST=$HOST

ENV DIALECT=$DIALECT

ENV DB=$DB

ENV USER=$USER

ENV PASS=$PASS

ENV PORT=$PORT

EXPOSE 5050

CMD [ "npm","run","start" ]
