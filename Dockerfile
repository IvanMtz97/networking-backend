ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-alpine

ENV EDITOR=vim

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
