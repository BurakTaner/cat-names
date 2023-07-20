FROM node:18

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i -g pnpm

RUN pnpm i

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "pnpm", "start" ]
