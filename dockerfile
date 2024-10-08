FROM node:22 as build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

## ----------------------------
FROM nginx

COPY --from=build /app/build /usr/share/nginx/html
