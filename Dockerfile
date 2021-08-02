FROM node:14-slim

WORKDIR /var/www

COPY package*.json .

CMD npm ci && npm run start