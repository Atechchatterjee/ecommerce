FROM node:14-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /frontend

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000
