FROM node:19.8-alpine3.16

WORKDIR /server

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD npm start

