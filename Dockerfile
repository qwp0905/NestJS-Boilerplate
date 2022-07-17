FROM node:lts

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npm run build

COPY dist .

RUN npm run start

