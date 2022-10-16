FROM node:lts

COPY . /origin

WORKDIR /origin

RUN npm ci && \
    npm run build && \
    cp -r dist /app && \
    cp -r node_modules /app/node_modules && \
    rm -rf /origin

WORKDIR /app

CMD node main.js
