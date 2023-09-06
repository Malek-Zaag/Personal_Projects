FROM node:16
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
ARG DB_URI
ARG PORT
ENV DB_URI=$DB_URI
ENV PORT=$PORT
EXPOSE 3000
CMD [ "npm","run","start:dev" ,"app.js" ]