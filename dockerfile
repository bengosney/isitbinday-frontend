FROM node:22 as build

WORKDIR /app

RUN corepack enable

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN pnpm install --frozen-lockfile

COPY . /app

RUN pnpm run build

## ----------------------------
FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html
