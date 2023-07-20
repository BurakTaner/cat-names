FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm

RUN pnpm i

COPY . ./

EXPOSE 5173

ENTRYPOINT [ "pnpm", "dev" ]
